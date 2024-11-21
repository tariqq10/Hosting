from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Users
from flask import jsonify

def donor_required(fn):
    @wraps(fn)
    @jwt_required()
    def decorator(*args, **kwargs):
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)
        if not user or user.role != 'user':
            # Return JSON response as a dictionary instead of `jsonify`
            return {"message": "Access forbidden: user role required"}, 403
        return fn(*args, **kwargs)
    return decorator

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def decorator(*args, **kwargs):
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)
        if not user or user.role != 'admin':
            # Return JSON response as a dictionary
            return {"message": "Access forbidden: Admin role required"}, 403
        return fn(*args, **kwargs)
    return decorator

def ngo_required(fn):
    @wraps(fn)
    @jwt_required()
    def decorator(*args, **kwargs):
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)
        if not user or user.role != 'ngo':
            # Return JSON response as a dictionary
            return {"message": "Access forbidden: NGO role required"}, 403
        return fn(*args, **kwargs)
    return decorator
