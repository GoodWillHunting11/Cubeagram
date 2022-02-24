from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from jinja2 import Undefined
from wtforms.validators import DataRequired, ValidationError

def validate_comment(form, field):
    comment = field.data
    if comment == " " or comment == None or comment == Undefined:
        raise ValidationError('Please Enter a Comment')

class EditCommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired("Please provide a comment"), validate_comment])
    submit = SubmitField('submit')
