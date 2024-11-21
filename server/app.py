from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_restful import Api
from models import db, Users, Organizations, Donation_request, Categories, Donations, Reports
from Resources.auth import UserResource, LoginResource, LogoutResource 
from Resources.category import CategoryResource, ApprovedDonationRequestsByCategoryResource
from Resources.organization import OrganizationResource
from Resources.request import DonationRequestResource
from Resources.donations import DonationResource
from Resources.approval import DonationApprovalResource, ApprovedDonationResource
from Resources.report import ReportResource
from Resources.mpesa import GetAccessToken




#load enviroment variables from .env file
load_dotenv()

#create a flask instance
app = Flask(__name__)

#set up CORS for cross-origin requests
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_ECHO'] = True  # Allow SQLAlchemy to log SQL queries
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

#intergrate flask-RESTFUL extensions
api = Api(app)
jwt = JWTManager(app)
#create the migrate object to manage migrations
migrate = Migrate(app, db)
#link our db to the flask instance
db.init_app(app)

                                                                    #mvps
api.add_resource(UserResource, '/users', '/users/<int:user_id>')# Allow user authentication
api.add_resource(LoginResource, '/login') # Give the right to add, update, or remove data only to the right people based on their classification.
api.add_resource(LogoutResource, '/logout')
api.add_resource(CategoryResource, '/categories', '/categories/<int:id>') #Admins can create the different categories of donations.
api.add_resource(ApprovedDonationRequestsByCategoryResource, '/categories/<int:category_id>/approved_requests') #Donors should be able to filter by category.
api.add_resource(OrganizationResource, '/organizations', '/organizations/<int:id>')#Classify users on whether they are Admin, NGOs or Donors. in this case they are NGO's
api.add_resource(DonationRequestResource, '/requests', '/requests/<int:id>')#Admins can view all the donation requests.
api.add_resource(DonationResource, '/donations', '/donations/<int:id>')#Donors can be able to donate the amount they have. and Donors can view a list of their donations in the profiles.
api.add_resource(DonationApprovalResource, '/approvals', '/approvals/<int:request_id>')#Only Admins can approve an NGO’s donation request.
api.add_resource(ApprovedDonationResource, '/approved')#Donors can view all the approved donation requests
api.add_resource(ReportResource, '/reports')#admin can view all the donations/pending and approaved donation requests
api.add_resource(ReportResource, '/reports/user/<int:user_id>', endpoint="user_donations")
# Register resources
api.add_resource(GetAccessToken, '/access_token')  # Assuming GetAccessToken class is defined correctly
# Register STK push class as a resource






if __name__ == '__main__':
    # create_admin_user() # Create admin user if it doesn't exist
    app.run()
