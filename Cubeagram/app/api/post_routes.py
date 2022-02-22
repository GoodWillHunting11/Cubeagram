from flask import Blueprint, request
from flask_login import login_required
from app.forms.edit_post_form import EditPostForm
from app.models import db, Post, Comment
from app.forms import PostForm
from datetime import datetime

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
@login_required
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    return { 'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:postId>')
@login_required
def get_one_post(postId):
    post = Post.query.get(postId)
    print('postttt', post)
    return post.to_dict()

@post_routes.route('/', methods=['POST'])
@login_required
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

@post_routes.route('/<int:postId>', methods=['PUT'])
@login_required
def edit_post(postId):
    data = request.json
    print('data', data)
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post_to_update = Post.query.get(postId)

        post_to_update.body = data['body']
        post_to_update.time_updated = datetime.now()

        db.session.commit()

        return post_to_update.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:postId>', methods=["DELETE"])
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()

    return {'msg': 'Successfully deleted'}

@post_routes.route('/<int:postId>/comments')
@login_required
def get_comments(postId):
    comments = Comment.query.filter(Comment.postId == postId).order_by(Comment.id.asc()).all()
    return { 'comments': [comment.to_dict() for comment in comments]}
