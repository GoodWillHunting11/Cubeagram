"""empty message

Revision ID: bd00b4f78720
Revises: 633241c0584f
Create Date: 2022-02-21 18:29:37.556529

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd00b4f78720'
down_revision = '633241c0584f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'body')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('body', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
