import os
import requests
from flask import Flask, jsonify, make_response
from flask_restful import Api, Resource
from dotenv import load_dotenv

app = Flask(__name__)
api = Api(app)

# Load environment variables
load_dotenv()

class GetAccessToken(Resource):
    def get(self):
        # M-Pesa API credentials from .env file
        consumer_key = os.getenv("MPESA_CONSUMER_KEY")
        consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
        
        # The M-Pesa OAuth URL for access token generation
        access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        
        # Setting headers and authentication for the request
        headers = {'Content-Type': 'application/json'}
        auth = (consumer_key, consumer_secret)
        
        try:
            # Making the GET request to Safaricom's OAuth endpoint
            response = requests.get(access_token_url, headers=headers, auth=auth)
            
            # Raise exception if the response code is not 2xx
            response.raise_for_status()
            
            # Parse the JSON response to get the access token
            result = response.json()
            access_token = result.get('access_token')
            
            if access_token:
                # Return the access_token as a JSON response
                return make_response(jsonify({'access_token': access_token}), 200)
            else:
                # Return an error if access_token was not found
                return make_response(jsonify({'error': 'Access token not found in response'}), 400)
        
        except requests.exceptions.RequestException as e:
            # Handle errors from the requests library (e.g., network issues, invalid credentials)
            return make_response(jsonify({'error': str(e)}), 500)



if __name__ == '__main__':
    app.run(debug=True)