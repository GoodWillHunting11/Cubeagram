from flask import Blueprint, request, render_template
from flask_login import login_required
from app.forms.edit_post_form import EditPostForm
from app.models import db, Post, User, Comment
from app.forms import PostForm
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from app.forms.comment_form import CommentForm
from app.forms.edit_comment_form import EditCommentForm
from datetime import datetime
import json

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages

@comment_routes.route('/<int:commentId>')
def get_one_comment(commentId):
    comment = Comment.query.get(commentId)
    return comment.to_dict()

@comment_routes.route('/', methods=['POST'])
@login_required
def post_comment():
    data = request.json
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment(
            userId= data["userId"],
            postId= data["postId"],
            body = data["body"],
            time_created= datetime.utcnow(),
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:commentId>', methods=["PUT"])
@login_required
def edit_comment(commentId):
    data = request.json
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment_to_update = Comment.query.get(commentId)

        comment_to_update.body = data['body']
        comment_to_update.time_updated = datetime.now()

        db.session.commit()

        return comment_to_update.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:commentId>', methods=["DELETE"])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()

    return {'msg': 'Successfully deleted'}
