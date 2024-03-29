from flask import Blueprint, request
from flask_login import login_required
from app.models import Like, db
from sqlalchemy.orm import joinedload
from datetime import datetime

like_routes = Blueprint("likes", __name__)


@like_routes.route('/')
@login_required
def all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/', methods = ['POST'])
@login_required
def post_like():
    data = request.json
    newLike = Like(
        user_id = data["user_id"],
        post_id = data["post_id"],
        created_at = datetime.now()
)
    db.session.add(newLike)
    db.session.commit()
    return newLike.to_dict()



@like_routes.route('/<int:likeId>/unlike', methods=["DELETE"])
@login_required
def delete_like(likeId):
    like = Like.query.get(likeId)
    if like:
        db.session.delete(like)
        db.session.commit()
        return { "message": "Delete Successful" }
