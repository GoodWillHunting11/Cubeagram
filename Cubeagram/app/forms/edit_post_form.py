from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from wtforms.validators import DataRequired

class EditPostForm(FlaskForm):
    body = TextAreaField('body')
    submit = SubmitField('submit')
