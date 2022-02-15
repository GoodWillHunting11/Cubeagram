from app.models import db, Post

def seed_posts():
    demo_post_1 = Post(
        userId=1,
        imageUrl='https://i5.walmartimages.com/asr/213b9296-38de-4574-a590-09f2ca126133_1.67607627d7d81582b16278e3f17b8cda.jpeg',
        body='Got a new cube yesterday!'
    )
    demo_post_2 = Post(
        userId=1,
        imageUrl='https://images.squarespace-cdn.com/content/v1/5943b11db3db2be040e6fa54/1584863714543-FYTYZ2VAEUYI83GTLYAL/rubik%27s+cube.jpg?format=1000w',
        body='My cube collection'
    )
    marnie_post_1 = Post(
        userId=2,
        imageUrl='https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2018/03/08/5a05d301-c1c2-4ca2-8253-2826ee4f2f21/red-bull-rubiks-cube-world-championship-in-vienna-in-february-2018',
        body='Competed in a tournament today!'
    )
    bobbie_post_1 = Post(
        userId=3,
        imageUrl='https://hackaday.com/wp-content/uploads/2021/10/7-54-screenshot.png?w=800',
        body="Lego Rubik's cube"
    )

    db.session.add(demo_post_1)
    db.session.add(demo_post_2)
    db.session.add(marnie_post_1)
    db.session.add(bobbie_post_1)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
