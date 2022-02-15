from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired("Please provide a comment")])
    submit = SubmitField('submit')
