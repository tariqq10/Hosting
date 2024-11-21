"""Add donation request relationship to donations

Revision ID: add_donation_request_rel
Revises: 2f53a28fde73
Create Date: 2024-11-09
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_donation_request_rel'
down_revision = '2f53a28fde73'
branch_labels = None
depends_on = None


def upgrade():
    # Step 1: Add new column as nullable
    with op.batch_alter_table('donations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('donation_request_id', sa.Integer(), nullable=True))
        
        # Add foreign key constraint
        batch_op.create_foreign_key(
            'fk_donations_request_id',
            'donation_requests',
            ['donation_request_id'],
            ['request_id']
        )
    
    # Step 2: Link existing donations to donation requests
    # This links donations to requests in the same category
    op.execute("""
        UPDATE donations d
        SET donation_request_id = (
            SELECT request_id 
            FROM donation_requests dr
            WHERE dr.category_id = d.category_id
            ORDER BY dr.request_id
            LIMIT 1
        )
        WHERE d.donation_request_id IS NULL;
    """)


def downgrade():
    with op.batch_alter_table('donations', schema=None) as batch_op:
        # First drop the foreign key constraint
        batch_op.drop_constraint('fk_donations_request_id', type_='foreignkey')
        # Then drop the column
        batch_op.drop_column('donation_request_id')