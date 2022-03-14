from .db import db
from sqlalchemy import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="post")
    comment = db.relationship("Comment", back_populates='post', cascade='all, delete-orphan')
    like = db.relationship("Like", back_populates="post", cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageUrl': self.imageUrl,
            'body': self.body,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
        }
