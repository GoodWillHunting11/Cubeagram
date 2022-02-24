from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from jinja2 import Undefined
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError

def validate_comment(form, field):
    comment = field.data
    if comment == " " or comment == None or comment == Undefined:
        raise ValidationError('Please Enter a Comment')

class CommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired("Please Provide a Valid Comment")])
    submit = SubmitField('submit')
