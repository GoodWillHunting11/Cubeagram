from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField

class EditPostForm(FlaskForm):
    body = TextAreaField('body')
    submit = SubmitField('submit')
