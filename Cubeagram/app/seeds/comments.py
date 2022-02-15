from app.models import db, Comment

def seed_comments():
    demo_comment_1 = Comment(
        body='That is really cool',
        userId=1,
        postId=3
    )
    demo_comment_2 = Comment(
        body='Eric needs to get one of those',
        userId=1,
        postId=2
    )
    marnie_comment_1 = Comment(
        body='How do you even solve one of those?',
        userId=2,
        postId=1
    )
    bobbie_comment_1 = Comment(
        body='I just usually peel the stickers off',
        userId=3,
        postId=4
    )

    db.session.add(demo_comment_1)
    db.session.add(demo_comment_2)
    db.session.add(marnie_comment_1)
    db.session.add(bobbie_comment_1)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
