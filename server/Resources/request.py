from models import db, Donation_request, Organizations, Users, Categories
from flask_restful import Resource, reqparse
from flask import request
from Resources.roles import admin_required, ngo_required
from flask_jwt_extended import get_jwt_identity, jwt_required
from Resources.category import CategoryResource

class DonationRequestResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('title', type=str, required=True, help='title of the donation is required')
    parser.add_argument('description', type=str, required=True, help='description of the donation is required')
    parser.add_argument('status', type=str, required=False, help='status of the donation is required')
    parser.add_argument('target_amount', type=float, required=True, help='amount of the donation is required')
    parser.add_argument('category_name', type=str, required=True, help='category_name of the request is required')

    
    @jwt_required()
    def get(self, id=None):
        user_id = get_jwt_identity()  # Get the logged-in user's ID from the JWT token
        user = Users.query.filter_by(user_id=user_id).first()

        if user is None:
            return {"message": "User not found"}, 404

        if user.role == 'ngo':  # If the user is an NGO
            organization_id = user.organization_id
            if id is None:
                # Retrieve all requests for the user's organization
                organization_requests = Donation_request.query.filter_by(organization_id=organization_id).all()
                if not organization_requests:
                    return {"message": "No donation requests found for your organization"}, 404
                return [request.to_dict() for request in organization_requests], 200
            else:
                # Retrieve a specific request for the user's organization
                donation_request = Donation_request.query.filter_by(request_id=id, organization_id=organization_id).first()
                if donation_request is None:
                    return {"message": "Donation request not found"}, 404
                return donation_request.to_dict(), 200

        elif user.role == 'admin':  # If the user is an Admin
            if id is None:
                # Admin can retrieve all donation requests
                all_requests = Donation_request.query.all()
                return [request.to_dict() for request in all_requests], 200
            else:
                # Admin can retrieve a specific donation request
                donation_request = Donation_request.query.filter_by(request_id=id).first()
                if donation_request is None:
                    return {"message": "Donation request not found"}, 404
                return donation_request.to_dict(), 200

        else:
            # If the user role is not recognized, deny access
            return {"message": "Access denied"}, 403
    @ngo_required
    def post(self):
        data = self.parser.parse_args()

        # Get the logged-in user's ID
        user_id = get_jwt_identity()

        # Fetch the user to get their organization_id
        user = Users.query.filter_by(user_id=user_id).first()
        if not user or not user.organization_id:
            return {'message': 'User is not associated with any organization.'}, 400

        # Get the category name from the parsed arguments
        category_name = data.pop('category_name')  # Remove category_name from data dict
        
        # Find the corresponding category
        category = Categories.query.filter_by(name=category_name).first()
        if not category:
            return {'message': 'Invalid category selected'}, 400

        # Create the donation request data dictionary
        donation_data = {
            'title': data['title'],
            'description': data['description'],
            'status': data['status'],
            'target_amount': data['target_amount'],
            'organization_id': user.organization_id,
            'category_id': category.category_id
        }

        try:
            # Check if a similar donation request already exists
            existing_request = Donation_request.query.filter_by(
                title=donation_data['title'],
                description=donation_data['description'],
                target_amount=donation_data['target_amount'],
                organization_id=donation_data['organization_id'],
                category_id=donation_data['category_id']
            ).first()

            if existing_request:
                return {'message': 'Donation request already exists'}, 400

            # Create a new donation request
            donation_request = Donation_request(**donation_data)
            db.session.add(donation_request)
            db.session.commit()
            return donation_request.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            return {'message': "Error creating the donation request", "error": str(e)}, 500
        
        
    @ngo_required   
    def patch(self, id):
        data = self.parser.parse_args()
        
        # Find the donation request by its ID
        request = Donation_request.query.filter_by(request_id=id).first()
        
        if request is None:
            return {'message': 'Request not found'}, 404
        
        # Initialize a flag to track if any changes were made
        changes_made = False
        response_message = []
        
        # Update the title if it's provided and different from the current title
        if 'title' in data and data['title'] is not None:
            if request.title!= data['title']:
                request.title = data['title']
                changes_made = True
                response_message.append("Title updated successfully")
            else:
                response_message.append("Title is already up to date")
                
        # Update the description if it's provided and different from the current description
        if 'description' in data and data['description'] is not None:
            if request.description!= data['description']:
                request.description = data['description']
                changes_made = True
                response_message.append("Description updated successfully")
            else:
                response_message.append("Description is already up to date")
                
        #update the target if it's provided and different from the current target_amount
        if 'target_amount' in data and data['target_amount'] is not None:
            if request.target_amount!= data['target_amount']:
                request.target_amount = data['target_amount']
                changes_made = True
                response_message.append("Target amount updated successfully")
            else:
                response_message.append("Target amount is already up to date")
                
        # Update the status if it's provided and different from the current status
        if'status' in data and data['status'] is not None:
            if request.status!= data['status']:
                request.status = data['status']
                changes_made = True
                response_message.append("Status updated successfully")
            else:
                response_message.append("Status is already up to date")
                
        try:
            if changes_made:
                db.session.commit()
                return {
                    "message": "donation_request updated successfully",
                    "message": response_message,
                    "donation_request": request.to_dict()
                    }, 200
            else:
                return {"message": "No changes made"}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': "error updating the donation_request", "error": str(e)}, 500
    @ngo_required    
    def delete(self, id):
        request = Donation_request.query.filter_by(request_id=id).first()
        
        if request is None:
            return {'message': 'Request not found'}, 404
        
        try:
            db.session.delete(request)
            db.session.commit()
            return {'message': 'Donation request deleted successfully',
                    "request": request.to_dict()
                    }, 202
        except Exception as e:
            db.session.rollback()
            return {'message': "error deleting the donation_request", "error": str(e)}, 500
        
            
        
        
    
    
    
    
