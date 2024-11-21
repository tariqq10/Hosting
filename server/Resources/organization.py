from flask_restful import Resource, reqparse
from models import db, Organizations
from flask import request

class OrganizationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str,required = True, help = 'Name of the organization is required')
    parser.add_argument('description', type=str, required=True, help = 'Description of the organization is required')
    parser.add_argument('address', type=str,required = True, help = 'Address of the organization is required')
    
    def get(self, id=None):
        if id is None:
            organizations = Organizations.query.all()
            return [organization.to_dict() for organization in organizations], 200
        #filter by id
        organization = Organizations.query.filter_by(organization_id=id).first()
        if organization is None:
            return {"message": "Organization not found"}, 404
        return organization.to_dict(), 200 #return a serialized response
    
    def post(self):
        data = self.parser.parse_args()
        
        try:
            organization = Organizations(name=data['name'], description=data['description'], address=data['address'])
            organizations = Organizations.query.all()
            for organization in organizations:
            
                if organization.name == data['name'] or organization.description == data['description'] or organization.address == data['address']:
                    return {"message": "Organization already exists"}, 409
            db.session.add(organization)
            db.session.commit()
            return organization.to_dict(), 201
            
        
        except Exception as e:
            db.session.rollback()
            return{'message': "error creating the category","error": str(e)}, 500
        
    def patch(self, id):
        data = self.parser.parse_args()

        # Find the organization by its ID
        organization = Organizations.query.filter_by(organization_id=id).first()

        if organization is None:
            return {"message": "Organization not found"}, 404

        # Initialize a flag to track if any changes were made
        changes_made = False
        response_message = []

        # Update the name if it's provided and different from the current name
        if 'name' in data and data['name'] is not None:
            if organization.name != data['name']:
                organization.name = data['name']
                changes_made = True
                response_message.append("Name updated successfully")
            else:
                response_message.append("Name is already up to date")

        # Update the description if it's provided and different from the current description
        if 'description' in data and data['description'] is not None:
            if organization.description != data['description']:
                organization.description = data['description']
                changes_made = True
                response_message.append("Description updated successfully")
            else:
                response_message.append("Description is already up to date")

        # Update the address if it's provided and different from the current address
        if 'address' in data and data['address'] is not None:
            if organization.address != data['address']:
                organization.address = data['address']
                changes_made = True
                response_message.append("Address updated successfully")
            else:
                response_message.append("Address is already up to date")

        try:
            db.session.commit()
            if changes_made:
                return {
                    "message": "Organization updated successfully",
                    "details": response_message,
                    "organization": organization.to_dict()
                }, 200
            else:
                return {"message": "No changes were made to the organization"}, 204
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error updating the organization: {e}"}, 500
    def delete(self, id):
        organization = Organizations.query.filter_by(organization_id=id).first()
        if organization is None:
            return {"message": "Organization not found"}, 404
        try: 
            db.session.delete(organization)
            db.session.commit()
            return {
                "message": "Organization deleted successfully",
                "organization": organization.to_dict()
            },202
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error deleting the organization: {e}"}, 500
        
        
        

        
        
        
        
    
    
            
        
             