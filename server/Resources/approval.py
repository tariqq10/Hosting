from flask_restful import Resource
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Donation_request, Users
from Resources.roles import admin_required, donor_required


class DonationApprovalResource(Resource):
    @admin_required
    def patch(self, request_id):
        # Find the donation request by ID
        donation_request = Donation_request.query.filter_by(request_id=request_id).first()
        
        # Check if the donation request exists
        if donation_request is None:
            return {'message': 'Donation request not found'}, 404
        
        # Check if the donation request is already approved 
        if donation_request.status == 'approved':
            return {'message': 'Donation request already approved'}, 200
        
        # Update the status to approved
        donation_request.status = 'approved'
        
        try:
            db.session.commit()
            return {
                'message': 'Donation request approved successfully',
                'donation_request': donation_request.to_dict()
            }, 200
            
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error approving the donation request', 'error': str(e)}, 500
        
    @admin_required
    def get(self):
        '''
        Get the list of pending donation requests for the admin.
        This will return all donation requests with the status 'pending'
        ''' 
        # Query for all pending donation requests (those that are not approved yet)
        donation_requests = Donation_request.query.filter_by(status='pending').all()
        
        if not donation_requests:
            return {'message': 'No pending donation requests were found'}, 404
        
        pending_requests = [request.to_dict() for request in donation_requests]
        
        return {'pending_donations': pending_requests}, 200


class ApprovedDonationResource(Resource):
    
    
    @jwt_required() #ensure the user is authenticated
    def get(self):
        '''
        Get the list of approved donation requests for the logged in user.
        if the user is an NGO, return their organizations approved requests
        if the user is not an NGO return all approaved requets
        
        ''' 
        
        #get the user_id from the JWT token
        user_id = get_jwt_identity()
        
        #fetch the user object
        user = Users.query.filter_by(user_id=user_id).first()
        
        if not user:
            return {'message': 'User not found'}, 404
        
        #if the user is an NGO, return only the approved requests for their organization
        if user.role == 'ngo':
            #get the organization_id from the user object
            organization_id = user.organization_id
            
            #query for approved donation requests created by the organization
            donation_request = Donation_request.query.filter_by(
                status='approved',
                organization_id=organization_id
            ).all()
        else:
            #if the user is not an NGO, return all approved donation requests
            donation_request = Donation_request.query.filter_by(status='approved').all()
            
        if not donation_request:
            return {"message": "No approved donation requests found"}, 404
        
        
        #prepare the list of approved donation requests
        approved_requests = [request.to_dict() for request in donation_request]
        
        return {'approved_donations': approved_requests}, 200
        
        
        
        
        
        
        
        
        
        
        
        # # Query for all approved donation requests
        # donation_requests = Donation_request.query.filter_by(status='approved').all()
        
        # if not donation_requests:
        #     return {'message': 'No approved donation requests were found'}, 404
        
        # approved_requests = [request.to_dict() for request in donation_requests]
        
        # return {'approved_donations': approved_requests}, 200
