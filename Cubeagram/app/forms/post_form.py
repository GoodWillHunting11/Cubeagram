from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    imageUrl = StringField('imageUrl', validators=[DataRequired("Please provide a valid image URL")])
    body = TextAreaField('body')
    submit = SubmitField('submit')
