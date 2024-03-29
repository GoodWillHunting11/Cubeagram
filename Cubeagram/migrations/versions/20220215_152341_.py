"""empty message

Revision ID: 6fe7e3fc6b02
Revises: ffdc0a98111c
Create Date: 2022-02-15 15:23:41.081044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fe7e3fc6b02'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('imageUrl', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'imageUrl')
    # ### end Alembic commands ###
