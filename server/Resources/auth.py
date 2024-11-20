from flask import request
from flask_restful import Resource, reqparse
from models import db, Users, Organizations, TokenBlacklist
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from flask_bcrypt import generate_password_hash, check_password_hash
from Resources.roles import admin_required
import re

class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', type=str, required=True, help='first_name is required')
    parser.add_argument('last_name', type=str, required=True, help='last_name is required')
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('phone', type=str, required=True, help='phone number is required')
    parser.add_argument('role', type=str, required=True, help='role is required')
    parser.add_argument('password', type=str, required=True, help='password is required')
    parser.add_argument('confirm_password', type=str, required=True, help='confirm_password is required')
    
    # Organization-specific fields for NGO role
    parser.add_argument('organization_name', type=str, required=False, help='Organization name (required for NGO role)')
    parser.add_argument('organization_description', type=str, required=False, help='Organization description (required for NGO role)')
    parser.add_argument('organization_address', type=str, required=False, help='Organization address (required for NGO role)')

    def post(self):
        data = self.parser.parse_args()
        
        # Validate the email format
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'
        if not re.match(email_pattern, data['email']):
            return {'message':'Invalid email format'}

        # 1. Verify phone and email uniqueness
        existing_number = Users.query.filter_by(phone=data['phone']).first()
        if existing_number:
            return {'message': 'Phone number already exists'}, 422
        
        existing_email = Users.query.filter_by(email=data['email']).first()
        if existing_email:
            return {'message': 'Email already exists'}, 422
        
        # 2. Check if passwords match
        if data['password'] != data['confirm_password']:
            return {'message': 'Passwords do not match'}, 422
        
        # 3. Hash password
        hashed_password = generate_password_hash(data['password']).decode('utf8')

        # 4. Handle NGO Role (Create the organization and link it to the user)
        if data['role'] == 'ngo':
            # Ensure NGO organization details are provided
            if not data.get('organization_name') or not data.get('organization_description') or not data.get('organization_address'):
                return {'message': 'Organization details are required for NGO role'}, 400

            # Create the organization
            organization = Organizations(
                name=data['organization_name'],
                description=data['organization_description'],
                address=data['organization_address'],
                is_approved=False  # Assuming approval happens later
            )
            
            # Add the organization to the session
            db.session.add(organization)
            db.session.commit()  # Commit to get organization ID
            
            # Create the user and associate it with the new organization
            user = Users(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                phone=data['phone'],
                role=data['role'],
                password=hashed_password,
                organization_id=organization.organization_id  # Link to the newly created organization
            )
        
        else:
            # For non-NGO users (admin, donor, etc.), no organization linking needed
            user = Users(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                phone=data['phone'],
                role=data['role'],
                password=hashed_password
            )
        
        # Add the user to the database
        db.session.add(user)
        db.session.commit()

        # Generate JWT token for the new user
        access_token = create_access_token(identity=user.user_id)

        return {
            'access_token': access_token,
            'user': user.to_dict(),
            'message': 'User created successfully'
        }, 201
        
        
    @jwt_required()
    @admin_required
    def get(self, user_id=None):
        
        if user_id:
            #Fetch a specific user by ID
            user = Users.query.filter_by(user_id=user_id).first()
            
            if user is None:
                return {'message': 'User not found'}, 404
            return user.to_dict(), 200  
        
        
        users = Users.query.all()
        
        if not users:
            return {'message': 'No users found'}, 404
        return [user.to_dict() for user in users], 200
        
        
    @admin_required  # ensure that only admins can delete users
    @jwt_required()
    def delete(self, user_id):
        # get the ID of the logged-in user (admin)
        current_user_id = get_jwt_identity()
        current_user = Users.query.get(current_user_id)
        
        # make sure that the logged-in user is an admin
        if current_user.role != 'admin':
            return {"message": 'Only admins can delete user'}
        
        user_to_delete = Users.query.get(user_id)
        
        if not user_to_delete:
            return {'message': "User not found"}
        
        # prevent the admin from deleting themselves
        if user_to_delete.user_id == current_user_id:
            return {'message': 'You cannot delete your own account'}, 400
        
        try:
            db.session.delete(user_to_delete)
            db.session.commit()
            return {'message': 'User deleted successfully', 
                    'user': user_to_delete.to_dict()
                    }, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error deleting user', 'error': str(e)}, 500        


class LoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('password', type=str, required=True, help='password is required')
    
    def post(self):
        data = self.parser.parse_args()
        user = Users.query.filter_by(email=data['email']).first()
        if user is None:
            return {'message': 'Invalid credentials'}, 401
        
        # Verify the password
        if check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity=user.user_id)
            
            return {
                'access_token': access_token,
                'user': user.to_dict(),
                'message': 'Logged in successfully'
            }, 200
        else:
            return {'message': 'Invalid credentials'}, 401


# If you want to add an endpoint that only admins can access:
class AdminOnlyResource(Resource):
    @jwt_required()  # Make sure the user is logged in
    def get(self):
        # Get the logged-in user's ID
        current_user_id = get_jwt_identity()
        user = Users.query.get(current_user_id)
        
        # Check if the user is an admin
        if user and user.role == 'admin':
            return {'message': 'Welcome, admin! You have access to this resource.'}, 200
        else:
            return {'message': 'Access denied. Admins only.'}, 403  # Forbidden if not admin
        


class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        # Get the JWT token's unique identifier (jti)
        jti = get_jwt().get("jti")

        # Check if the jti is already in the blacklist
        if TokenBlacklist.query.filter_by(jti=jti).first():
            return {'message': 'Token already blacklisted'}, 200

        # Add the JWT ID to the blacklist
        token = TokenBlacklist(jti=jti)
        db.session.add(token)
        try:
            db.session.commit()
            return {'message': 'Logged out successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error logging out', 'error': str(e)}, 500