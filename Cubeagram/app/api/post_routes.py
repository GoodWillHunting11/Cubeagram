from flask import Blueprint, request, render_template
from app.models import db, Post
from app.forms import PostForm
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
import json

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages

@post_routes.route('/')
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    return { 'posts': [post.to_dict() for post in posts]}
