from flask import Blueprint, request, render_template
from flask_login import login_required
from app.models import db, Post, User
from app.forms import PostForm
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from datetime import datetime
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
# @login_required
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    return { 'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:postId>')
# @login_required
def get_one_post(postId):
    post = Post.query.get(postId)
    print('postttt', post)
    return post.to_dict()

@post_routes.route('/add', methods=['POST'])
# @login_required
def post_post():
    data = request.json
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_post = Post(
            userId= data["userId"],
            imageUrl = data["imageUrl"],
            body = data["body"],
            time_created= datetime.utcnow(),
        )

        db.session.add(new_post)
        db.session.commit()
        return data

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

# @post_routes.route('/edit', methods=['PUT'])
