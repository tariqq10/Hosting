from datetime import datetime
from app import app
from models import db, Users, Organizations, Donation_request, Categories, Donations, Reports
from flask_bcrypt import Bcrypt

#initialize bcrypt
bcrypt = Bcrypt()


with app.app_context():
    print("Starting seeding process...")

    # Delete initial data in a safe order to avoid foreign key violations
    try:
        db.session.query(Donations).delete()
        db.session.query(Donation_request).delete()
        db.session.query(Reports).delete()
        db.session.query(Users).delete()
        db.session.query(Organizations).delete()
        db.session.query(Categories).delete()
        db.session.commit()
        print("Initial data deleted successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting initial data: {e}")

    # Seed users with duplicate checks
        # Seed data for users
    print("Seeding users...")
    users_data = [
        {"first_name": "John", "last_name": "Doe", "email": "john@example.com", "phone": 1234567890, "password": "password", "role": "admin"},
        {"first_name": "Jane", "last_name": "Smith", "email": "jane@example.com", "phone": 9876543210, "password": "password", "role": "user"},
        {"first_name": "Mike", "last_name": "Johnson", "email": "mike@ngo.org", "phone": 1122334455, "password": "password", "role": "ngo"},
    ]

    try:
        for user_data in users_data:
            # Check if the user already exists by email
            existing_user = Users.query.filter_by(email=user_data["email"]).first()
            
            if not existing_user:
                # Hash the password before saving
                hashed_password = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
                user_data["password"] = hashed_password  # Update password field with the hashed password

                # Create new user with hashed password
                new_user = Users(**user_data)

                # Add new user to the session
                db.session.add(new_user)

        # Commit all changes to the database
        db.session.commit()

        print("Users seeded successfully.")

    except Exception as e:
        db.session.rollback()
        print(f"Error seeding users: {e}")

    # Seed categories with duplicate checks
    print("Seeding categories...")
    categories_data = [
        {"name": "Flood Victims", "description": "Helping victims of floods by providing relief supplies and rebuilding efforts."},
        {"name": "Hunger", "description": "Providing food for those who are hungry, malnourished, or facing food insecurity."},
        {"name": "Hospital Bills", "description": "Helping people pay medical bills and cover healthcare costs."},
        {"name": "School Fees", "description": "Donating to cover school fees and educational expenses for underprivileged students."},
        {"name": "Medical Treatment", "description": "Donating for medical treatment, including surgeries and health interventions."},
        {"name": "Shelter", "description": "Providing temporary housing or constructing homes for homeless individuals and families."},
    ]
    try:
        for category_data in categories_data:
            existing_category = Categories.query.filter_by(name=category_data["name"]).first()
            if not existing_category:
                new_category = Categories(**category_data)
                db.session.add(new_category)
        db.session.commit()
        print("Categories seeded successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding categories: {e}")

    # Seed organizations with duplicate checks
    print("Seeding organizations...")
    organizations_data = [
        {"name": "Red Cross", "description": "Non-profit organization that aims to improve the lives of the less fortunate", "address": "Nairobi, Kenya"},
        {"name": "Humanitarian Society of Africa", "description": "International humanitarian organization that works to protect and restore lives in Africa", "address": "Cape Town, South Africa"},
    ]
    try:
        for org_data in organizations_data:
            existing_org = Organizations.query.filter_by(name=org_data["name"]).first()
            if not existing_org:
                new_org = Organizations(**org_data)
                db.session.add(new_org)
        db.session.commit()
        print("Organizations seeded successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding organizations: {e}")

   
