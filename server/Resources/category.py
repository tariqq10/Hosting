from flask_restful import Resource, reqparse
from models import Categories,Users,Donation_request, db
from flask import request
from Resources.roles import admin_required
from flask_jwt_extended import jwt_required, get_jwt_identity

class CategoryResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name of the category is required')
    parser.add_argument('description', type=str, required=True, help='Description of the category is required')

    def get(self, id=None):
        #if id is not provided, fetch all the categories
        if id is None:
            categories = Categories.query.all()
            return [category.to_dict() for category in categories], 200 #serializing all the categories
        
        # if id is provided, fetch the category with the given id
        category = Categories.query.filter_by(category_id=id).first()
        if category is None:
            return {
                'message': "Category not found"
            }, 404
        return category.to_dict(), 200 #return the serilaized category
    @admin_required
    def post(self):
        data = self.parser.parse_args()
        
        try:
            category = Categories(name=data['name'], description=data['description'])
            db.session.add(category)
            db.session.commit()
            return category.to_dict(), 201 # return the serilaized category with status code 201
        except Exception as e:
            db.session.rollback()
            return{'message': "error creating the category","error": str(e)}, 500
    @admin_required
    def patch(self, id):
        data = self.parser.parse_args()
        category = Categories.query.filter_by(category_id = id).first()
        
        if category is None:
            return {
                'message': "Category not found"
            }, 404
        category.name = data['name']
        category.description = data['description']
        if category.name == data['name'] and category.description == data['description']:
            return {
                "message": "No changes made to the category",
                "category": category.to_dict()
            }, 200
        try:
            db.session.commit()
            return {
                "message": "category updated successfully",
                "category": category.to_dict()
                
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "an erro occurred updating the category","error": str(e)},500
    @admin_required    
    def delete(self, id):
        
        category = Categories.query.filter_by(category_id = id).first()
        
        if category is None:
            return {
                'message': "Category not found"
            },404
        db.session.delete(category)
        db.session.commit()
        return {
            "message": "category deleted successfully",
            "category_id": id
        }, 200
        
        
class ApprovedDonationRequestsByCategoryResource(Resource):
    @jwt_required() #ensure the user is authenticated
    def get(self, category_id):
        #fetch the user_id and verify the role from the JWT token
        user_id = get_jwt_identity()
        user = Users.query.filter_by(user_id=user_id).first()
        
        #check if the user has the user/donor role
        if user is None or user.role not in ['user', 'donor']:
            return {'message': 'Access denied: Only users with the donor/user role can view approved donation requests by category'}, 403
        
        #fetch approaved donation requests for the specific category
        approaved_request = Donation_request.query.filter_by(category_id=category_id, status='approved').all()
        
        if not approaved_request:
            return {'message': "No approaved donation requests found for this category"}, 404
        
        #return the serialized list of approaved donation request
        return [request.to_dict() for request in approaved_request], 200
            
    
    