import requests
import base64
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def initiate_stk_push(amount, phone, account_reference, transaction_desc):
    try:
        # Fetch M-Pesa credentials from environment variables
        consumer_key = os.getenv("MPESA_CONSUMER_KEY")
        consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
        passkey = os.getenv("MPESA_PASSKEY")
        business_short_code = os.getenv("MPESA_SHORTCODE")
        callback_url = os.getenv("CALLBACK_URL")

        # Step 1: Get the access token from Safaricom API
        token_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        credentials = f"{consumer_key}:{consumer_secret}".encode()
        auth_header = base64.b64encode(credentials).decode()

        headers = {
            "Authorization": f"Basic {auth_header}"
        }

        # Fetch the access token
        token_response = requests.get(token_url, headers=headers)
        token_response.raise_for_status()
        access_token = token_response.json().get("access_token")

        if not access_token:
            raise ValueError("Failed to fetch access token")

        # Step 2: Prepare STK Push payload
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(f"{business_short_code}{passkey}{timestamp}".encode()).decode()

        # Prepare the STK Push payload
        stk_push_payload = {
            "BusinessShortCode": business_short_code,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": business_short_code,
            "PhoneNumber": phone,
            "CallBackURL": callback_url,
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc
        }

        # Step 3: Send the STK Push request
        stk_push_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        process_request_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        stk_response = requests.post(process_request_url, headers=stk_push_headers, json=stk_push_payload)
        stk_response.raise_for_status()

        # Step 4: Handle the response from STK Push
        stk_data = stk_response.json()

        if stk_data.get("ResponseCode") == "0":
            return {
                "message": "STK Push initiated successfully",
                "CheckoutRequestID": stk_data.get("CheckoutRequestID"),
                "ResponseCode": stk_data.get("ResponseCode")
            }, 200
        else:
            return {
                "error": "STK Push failed",
                "details": stk_data
            }, 400

    except requests.exceptions.RequestException as e:
        return {"error": "Network error during STK push", "details": str(e)}, 500
    except Exception as e:
        return {"error": "An error occurred", "details": str(e)}, 500
