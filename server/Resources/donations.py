from flask_restful import Resource, reqparse
from models import Donations, Donation_request, Users, db
from flask import request
from Resources.roles import donor_required, ngo_required
from flask_jwt_extended import get_jwt_identity, jwt_required
from Resources.stkpush import initiate_stk_push
class DonationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('amount', type=float, default=0.00, help='Amount is required for donation')
    parser.add_argument('donation_request_id', type=int, required=True, help='Donation Request ID is required')  # Add this line
    
    @jwt_required()  # Ensure JWT token is required for all access
    def get(self, id=None):
        # Fetch user ID from JWT token
        user_id = get_jwt_identity()
        
        # Check if user is a donor or an NGO
        user = Users.query.filter_by(user_id=user_id).first()  # Assuming user table has role info
        
        if user.role == 'admin':
            if id is None:
                #fetch all the donations across all the donation requests
                all_donations = Donations.query.all()
                if not all_donations:
                    return {"message": "No donations found"}, 404
                return [donation.to_dict() for donation in all_donations], 200
            
            #fetch a specific donation Id regardless of the organization
            donation = Donations.query.filter_by(donation_id=id).first()
            if donation is None:
                return {"message": "Donation not found"}, 404
            return donation.to_dict(), 200
        
        
        elif user.role == 'user':  # If the logged-in user is a donor
            if id is None:
                # Fetch donations made by the donor
                user_donations = Donations.query.filter_by(user_id=user_id).all()
                if not user_donations:
                    return {"message": "No donations found for this user"}, 404
                return [donation.to_dict() for donation in user_donations], 200

            # Fetch a specific donation made by the donor
            donation = Donations.query.filter_by(donation_id=id, user_id=user_id).first()
            if donation is None:
                return {"message": "Donation not found for this user"}, 404
            return donation.to_dict(), 200
        
        elif user.role == 'ngo':  # If the logged-in user is an NGO
            if id is None:
                # Fetch donations for approved donation requests created by the NGO
                user_organization_id = user.organization_id
                approved_donations = Donations.query.join(Donation_request).filter(
                    Donation_request.organization_id == user_organization_id,
                    Donation_request.status == 'approved'
                ).all()
                if not approved_donations:
                    return {"message": "No donations found for your approved donation requests"}, 404
                return [donation.to_dict() for donation in approved_donations], 200

            # Fetch a specific donation related to an approved donation request for the NGO
            donation = Donations.query.join(Donation_request).filter(
                Donation_request.organization_id == user.organization_id,
                Donation_request.status == 'approved',
                Donations.donation_id == id
            ).first()
            if donation is None:
                return {"message": "Donation not found for this approved donation request"}, 404
            return donation.to_dict(), 200

        
        
        
        
    @donor_required
    def post(self):
        # Parse the 'amount' field only, as other fields will be auto-assigned
        data = self.parser.parse_args()
        amount = data.get('amount')

        # Retrieve the user ID from the JWT token
        user_id = get_jwt_identity()

        # Get donation_request_id from the JSON body
        request_data = request.get_json()
        donation_request_id = request_data.get('donation_request_id')
        
        # Fetch the donation request by its ID
        donation_request = Donation_request.query.filter_by(request_id=donation_request_id).first()

        # Check if the donation request exists and is approved
        if donation_request is None:
            return {"message": "Donation request not found"}, 404
        if donation_request.status != "approved":
            return {"message": "Donation request must be approved first in order to be eligible for donation"}, 400
        
        # Set category_id from the donation_request object
        category_id = donation_request.category_id
        
        # Fetch the donor's phone number
        user = Users.query.filter_by(user_id=user_id).first()
        if user is None or not user.phone:
            return {"message": "Donor's phone number not found. Please update your profile with a valid phone number"}, 400
        phone = user.phone
        
        # #fetch the NGO's phone number through the organization model
        # organization_id = donation_request.organization_id
        # ngo_user = Users.query.filter_by(organization_id=organization_id).first()
        # if ngo_user is None or not ngo_user.phone:
        #     return {"message": "NGO's phone number nor found.Please contact the organization for support"}, 400
        # ngo_phone = ngo_user.phone

        # Create the new donation entry
        donation = Donations(
            amount=amount,
            user_id=user_id,
            category_id=category_id,
            donation_request_id=donation_request_id
        )

        try:
            # Save the donation to the database
            db.session.add(donation)
            db.session.commit()

            try:
                # Prepare the STK Push request parameters
                account_reference = donation_request.title
                transaction_desc = "Donation"
                
                # Initiate STK push and get response
                stk_response, status_code = initiate_stk_push(amount, phone, account_reference, transaction_desc)
                
                if status_code == 200:
                    return {
                        "message": "Donation successful. STK Push initiated",
                        "donation": donation.to_dict(),
                        "stk_details": stk_response
                    }, 201
                else:
                    # If STK Push fails but we want to keep the donation record
                    return {
                        "message": "Donation recorded, but STK Push failed",
                        "donation": donation.to_dict(),
                        "stk_error": stk_response
                    }, status_code

            except Exception as e:
                # Log the actual error for debugging
                print(f"STK Push error: {str(e)}")
                
                # Keep the donation record but return error about STK push
                return {
                    "message": "Donation saved, but M-Pesa STK Push failed.",
                    "error": str(e),
                    "donation": donation.to_dict()
                }, 500

        except Exception as e:
            # Rollback donation if saving to DB fails
            db.session.rollback()
            return {"message": "Error creating the donation", "error": str(e)}, 500



    @donor_required 
    def patch(self, id):
        data = self.parser.parse_args()
        
        # Fetch the donation by its ID
        donation = Donations.query.filter_by(donation_id=id).first()
        
        if donation is None:
            return {"message": "Donation not found"}, 404
        
        # Initialize a flag to track if any changes were made
        changes_made = False
        response_message = []
        
        # Update the donation details
        if 'amount' in data and data['amount'] is not None:
            if donation.amount != data['amount']:
                donation.amount = data['amount']
                changes_made = True
                response_message.append("Amount updated successfully")
            else:
                response_message.append("Amount is already up to date")
                    
        try:
            if changes_made:
                db.session.commit()
                return {
                    "message": "Donation updated successfully",
                    "donation": donation.to_dict(),
                    "details": response_message
                }, 200
            else:
                return {
                    "message": "No changes made to the donation",
                    "details": response_message
                }, 304  # 304 Not Modified indicates no changes were applied
            
        except Exception as e:
            db.session.rollback()
            return {"message": "Error updating the donation", "error": str(e)}, 500

      
    def delete(self, id):
        donation = Donations.query.filter_by(donation_id=id).first()
        
        if donation is None:
            return {"message": "Donation not found"}, 404
        
        try:
            donation_data = donation.to_dict()
            db.session.delete(donation)
            db.session.commit()
            return {
                "message": "Donation deleted successfully",
                "donation": donation_data
                }, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "Error deleting the donation", "error": str(e)}, 500
        
        
        
    