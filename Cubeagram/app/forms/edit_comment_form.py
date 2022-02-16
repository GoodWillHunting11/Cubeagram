from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired

class EditCommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired("Please provide a comment")])
    submit = SubmitField('submit')