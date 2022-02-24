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
    demo_comment_3 = Comment(
        body='that must have taken forever',
        userId=1,
        postId=14
    )
    demo_comment_4 = Comment(
        body="couldn't be me 🙃",
        userId=1,
        postId=13
    )
    demo_comment_5 = Comment(
        body='they did a really good job! I need to get something like that done with my dog',
        userId=1,
        postId=12
    )
    demo_comment_6 = Comment(
        body='😳😳😳',
        userId=1,
        postId=11
    )
    marnie_comment_1 = Comment(
        body='How do you even solve one of those?',
        userId=2,
        postId=1
    )
    marnie_comment_2 = Comment(
        body='Is this a trick question?',
        userId=2,
        postId=13
    )
    marnie_comment_3 = Comment(
        body='cheating will get you nowhere 🤓',
        userId=2,
        postId=10
    )
    marnie_comment_4 = Comment(
        body='no one cares 😉',
        userId=2,
        postId=7
    )
    bobbie_comment_1 = Comment(
        body='I just usually peel the stickers off',
        userId=3,
        postId=4
    )
    bobbie_comment_2 = Comment(
        body='was this at the world cup?',
        userId=3,
        postId=14
    )
    bobbie_comment_3 = Comment(
        body='looks pretty...pretty expensive 🤣🤣',
        userId=3,
        postId=12
    )
    bobbie_comment_4 = Comment(
        body='for everyone confused just do a "U" prime ✅',
        userId=3,
        postId=13
    )
    cuberdude98_comment_1 = Comment(
        body='but how good is the corner cutting?',
        userId=4,
        postId=11
    )
    cuberdude98_comment_2 = Comment(
        body='at that point just buy a new one 💀',
        userId=4,
        postId=10
    )
    cuberdude98_comment_3 = Comment(
        body='I could do that',
        userId=4,
        postId=14
    )

    db.session.add(demo_comment_1)
    db.session.add(bobbie_comment_1)
    db.session.add(bobbie_comment_2)
    db.session.add(demo_comment_2)
    db.session.add(marnie_comment_1)
    db.session.add(marnie_comment_2)
    db.session.add(demo_comment_3)
    db.session.add(demo_comment_6)
    db.session.add(marnie_comment_3)
    db.session.add(marnie_comment_4)
    db.session.add(cuberdude98_comment_3)
    db.session.add(bobbie_comment_3)
    db.session.add(bobbie_comment_4)
    db.session.add(cuberdude98_comment_1)
    db.session.add(demo_comment_4)
    db.session.add(demo_comment_5)
    db.session.add(cuberdude98_comment_2)


    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
