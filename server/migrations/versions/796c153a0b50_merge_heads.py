"""Merge heads

Revision ID: 796c153a0b50
Revises: 9314be256543, add_donation_request_rel
Create Date: 2024-11-09 21:01:55.392680

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '796c153a0b50'
down_revision = ('9314be256543', 'add_donation_request_rel')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
