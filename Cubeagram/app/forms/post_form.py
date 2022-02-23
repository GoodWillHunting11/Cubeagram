from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from wtforms.validators import DataRequired, ValidationError

def validate_image(form, field):
    web = field.data
    if "http" not in web or "." not in web:
        raise ValidationError('Please enter a valid image url.')

class PostForm(FlaskForm):
    imageUrl = StringField('Image URL', validators=[DataRequired("Please provide a valid image URL"), validate_image])
    body = TextAreaField('body')
    submit = SubmitField('submit')
