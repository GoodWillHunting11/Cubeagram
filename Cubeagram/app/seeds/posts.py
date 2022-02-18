from app.models import db, Post

def seed_posts():
    demo_post_1 = Post(
        userId=1,
        imageUrl='https://c0.wallpaperflare.com/preview/857/153/94/squares-rubik-s-rubiks-broken.jpg',
        body='Tried cheating and broke it :('
    )
    demo_post_2 = Post(
        userId=1,
        imageUrl='https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/GDTVIJP5Z5DHJAJ4WLQ256NM3E.jpg',
        body='First time seeing someone blind solve a 5x5'
    )
    marnie_post_1 = Post(
        userId=2,
        imageUrl='https://live-production.wcms.abc-cdn.net.au/c77d755746f4afcbdc2f91961e3d010a?impolicy=wcms_crop_resize&cropH=1536&cropW=2048&xPos=128&yPos=0&width=862&height=647',
        body='Got a chance to meet Felix Zemdegs today'
    )
    bobbie_post_1 = Post(
        userId=3,
        imageUrl='https://i.pinimg.com/originals/79/cd/90/79cd9099180eb5c0c5ca4b7b1ea22d5d.jpg',
        body="Cubert Einstein"
    )

    db.session.add(demo_post_1)
    db.session.add(demo_post_2)
    db.session.add(marnie_post_1)
    db.session.add(bobbie_post_1)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
