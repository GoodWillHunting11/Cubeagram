from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Must be 40 characters or less')

def validate_image(form, field):
    web = field.data
    if "http" not in web or "." not in web:
        raise ValidationError('Please enter a valid image url.')

def validate_email_length(form, field):
    email = field.data
    if len(email) > 255:
        raise ValidationError('Must be 255 characters or less')

def validate_image_url_length(form,field):
    image = field.data
    if len(image) > 255:
        raise ValidationError('Must be 255 characters or less')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, validate_email_length])
    imageUrl = StringField('imageUrl', validators=[DataRequired(), validate_image, validate_image_url_length])
    password = StringField('password', validators=[DataRequired()])
