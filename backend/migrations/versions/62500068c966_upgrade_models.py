"""Upgrade models

Revision ID: 62500068c966
Revises: 13d78c6b8eba
Create Date: 2024-12-18 13:10:19.187173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62500068c966'
down_revision: Union[str, None] = '13d78c6b8eba'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customer_orders', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'customer_orders', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'customer_orders', type_='foreignkey')
    op.drop_column('customer_orders', 'user_id')
    # ### end Alembic commands ###
