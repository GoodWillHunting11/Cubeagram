from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    imageUrl = StringField('imageUrl', validators=[DataRequired("Please provide a valid image URL")])
    body = StringField('body', validators=[DataRequired("Please provide a caption")])
    submit = SubmitField('submit')
