from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from datetime import datetime

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(2000), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.organization_id'), unique=True)
    
    # Relationships
    organization = db.relationship('Organizations', back_populates='user', uselist=False)  # Removed delete-orphan
    donations = db.relationship('Donations', back_populates='user', cascade='all, delete-orphan')
    
    # Serialize rules
    serialize_rules = ('-organization', '-donations')


class Organizations(db.Model, SerializerMixin):
    __tablename__ = 'organizations'
    
    organization_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    is_approved = db.Column(db.Boolean, default=False)
    address = db.Column(db.String(50), nullable=False)
    
    # Relationships
    user = db.relationship('Users', back_populates='organization')  # Kept it one-to-one without delete-orphan
    donation_requests = db.relationship('Donation_request', back_populates='organization', cascade="all, delete-orphan")
    
    # Serialize rules
    serialize_rules = ('-user', '-donation_requests')




class Donation_request(db.Model, SerializerMixin):
    __tablename__ = 'donation_requests'
    
    request_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.organization_id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'), nullable=False)
    
    # Relationships
    organization = db.relationship('Organizations', back_populates='donation_requests')
    category = db.relationship('Categories', back_populates='donation_requests')
    donations = db.relationship('Donations', back_populates='donation_request', cascade='all, delete-orphan')  # New relationship with Donations
    
    # Serialize rules
    serialize_rules = ('-organization', '-category', '-donations')

    # Adding category_name as a property to retrieve it from related Categories model
    @property
    def category_name(self):
        return self.category.name if self.category else None


class Categories(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    # Relationships
    donation_requests = db.relationship('Donation_request', back_populates='category', cascade='all, delete-orphan')
    donations = db.relationship('Donations', back_populates='category', cascade='all, delete-orphan')  # Added relationship
    
    # Serialize rules
    serialize_rules = ('-donation_requests', '-donations')


class Donations(db.Model, SerializerMixin):
    __tablename__ = 'donations'
    
    donation_id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'), nullable=False)
    donation_request_id = db.Column(db.Integer, db.ForeignKey('donation_requests.request_id'))  # Foreign key to Donation_request
    
    # Relationships
    user = db.relationship('Users', back_populates='donations')
    category = db.relationship('Categories', back_populates='donations')
    donation_request = db.relationship('Donation_request', back_populates='donations')  # New relationship with Donation_request
    
    # Serialize rules
    serialize_rules = ('-user', '-category', '-donation_request')


class Reports(db.Model, SerializerMixin):
    __tablename__ = 'reports'
    
    report_id = db.Column(db.Integer, primary_key=True)
    total_donations = db.Column(db.Float, nullable=False, default=0.0)
    total_pending_requests = db.Column(db.Float, nullable=False, default=0.0)
    total_approved_requests = db.Column(db.Float, nullable=False, default=0.0)
    report_date = db.Column(db.DateTime, server_default=db.func.now())
    
class TokenBlacklist(db.Model):
    __tablename__ = 'token_blacklist'
    
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), unique=True, nullable=False)  # JWT ID
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, jti):
        self.jti = jti

    def to_dict(self):
        return {'jti': self.jti, 'created_at': self.created_at}
