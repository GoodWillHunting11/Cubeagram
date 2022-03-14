from .db import db
from sqlalchemy import func

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="comment")
    post = db.relationship("Post", back_populates="comment")
    like = db.relationship("Like", back_populates="comment", cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'body': self.body,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
        }
