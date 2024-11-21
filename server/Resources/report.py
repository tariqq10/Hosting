from flask_restful import Resource
from models import Donations, db, Reports, Donation_request
from sqlalchemy import func
from flask_jwt_extended import jwt_required
from datetime import datetime
from Resources.roles import admin_required

class ReportResource(Resource):
    
    
    # @admin_required
    @jwt_required()
    def get(self):
        """
        Generate a summarized report including:
        - Total donations amount
        - Total pending donation requests count
        - Total approved donation requests count
        - Donations by category
        - Remaining donations to meet target for each donation request
        - List of all donation requests
        - List of approved donation requests
        - Count of pending donation requests
        """
        try:
            # Total donations amount
            total_donations = db.session.query(func.sum(Donations.amount)).scalar() or 0.0

            # Count of total donation requests
            total_donation_requests = db.session.query(func.count(Donation_request.request_id)).scalar()

            # Count of approved donation requests
            total_approved_requests = db.session.query(func.count(Donation_request.request_id)) \
                .filter(Donation_request.status == 'approved').scalar()

            # Count of pending donation requests
            total_pending_requests = db.session.query(func.count(Donation_request.request_id)) \
                .filter(Donation_request.status == 'pending').scalar()

            # Donations by category
            donations_by_category = db.session.query(
                Donations.category_id,
                func.sum(Donations.amount).label("total_amount")
            ).group_by(Donations.category_id).all()

            donations_by_category_dict = [
                {"category_id": category_id, "total_amount": total_amount}
                for category_id, total_amount in donations_by_category
            ]

            # Remaining donations for each donation request
            remaining_donations = db.session.query(
                Donation_request.request_id,
                Donation_request.target_amount,
                func.coalesce(func.sum(Donations.amount), 0).label("donated_amount"),
                (Donation_request.target_amount - func.coalesce(func.sum(Donations.amount), 0)).label("remaining_amount")
            ).outerjoin(Donations, Donations.donation_request_id == Donation_request.request_id) \
             .group_by(Donation_request.request_id) \
             .all()

            remaining_donations_dict = [
                {
                    "request_id": request_id,
                    "target_amount": target_amount,
                    "donated_amount": donated_amount,
                    "remaining_amount": remaining_amount
                }
                for request_id, target_amount, donated_amount, remaining_amount in remaining_donations
            ]

            # All donation requests
            all_donation_requests = db.session.query(
                Donation_request.request_id,
                Donation_request.title,
                Donation_request.description,
                Donation_request.status,
                Donation_request.target_amount,
                func.coalesce(func.sum(Donations.amount), 0).label("donated_amount")
            ).outerjoin(Donations, Donations.donation_request_id == Donation_request.request_id) \
             .group_by(Donation_request.request_id) \
             .all()

            all_donation_requests_dict = [
                {
                    "request_id": request_id,
                    "title": title,
                    "description": description,
                    "status": status,
                    "target_amount": target_amount,
                    "donated_amount": donated_amount
                }
                for request_id, title, description, status, target_amount, donated_amount in all_donation_requests
            ]

            # Approved donation requests
            approved_donation_requests = [
                request for request in all_donation_requests_dict if request["status"] == "approved"
            ]

            # Prepare the report data
            report_data = {
                "total_donations": total_donations,
                "total_pending_requests": total_pending_requests,
                "total_approved_requests": total_approved_requests,
                "total_donation_requests": total_donation_requests,
                "donations_by_category": donations_by_category_dict,
                "remaining_donations": remaining_donations_dict,
                "all_donation_requests": all_donation_requests_dict,
                "approved_donation_requests": approved_donation_requests
            }

            # Save the report entry
            report_entry = Reports(
                total_donations=total_donations,
                total_pending_requests=total_pending_requests,
                total_approved_requests=total_approved_requests,
                report_date=datetime.now()
            )
            db.session.add(report_entry)
            db.session.commit()

            return {"message": "Report generated successfully", "data": report_data}, 200

        except Exception as e:
            db.session.rollback()
            return {"message": "Error generating report", "error": str(e)}, 500
