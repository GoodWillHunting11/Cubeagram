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
    marnie_post_2= Post(
        userId=2,
        imageUrl='https://static01.nyt.com/images/2019/10/15/autossell/15rubiksrobot-promo/15rubiksrobot-promo-superJumbo-v2.jpg',
        body='Saw a Robot Solve a Cube at World Cup Today'
    )
    marnie_post_3= Post(
        userId=2,
        imageUrl='https://assets-eu-01.kc-usercontent.com/559bb7d3-88a4-01c1-79a3-dd4d5b2d2bb0/920fa3b3-8c83-4803-9250-7f6eb0e317c6/Rubix-Cube-Cake_Header.jpg',
        body="It took a while but I made a 3x3 cake for my son's 10th birthday!"
    )
    marnie_post_4= Post(
        userId=2,
        imageUrl='https://static01.nyt.com/images/2021/07/09/fashion/09Vows-RubiksCubes8/09Vows-RubiksCubes8-superJumbo.jpg',
        body='What do you guys think about the mosaic my husband and I had done for us?'
    )
    bobbie_post_1 = Post(
        userId=3,
        imageUrl='https://i.pinimg.com/originals/79/cd/90/79cd9099180eb5c0c5ca4b7b1ea22d5d.jpg',
        body="Cubert Einstein"
    )
    bobbie_post_2 = Post(
        userId=3,
        imageUrl='https://i.ytimg.com/vi/Rm8AdpDbpUs/maxresdefault.jpg',
        body="😂😂😂"
    )
    bobbie_post_3 = Post(
        userId=3,
        imageUrl='https://i.redd.it/deqcpnbdeo061.jpg',
        body="I'm the 1%"
    )
    bobbie_post_4 = Post(
        userId=3,
        imageUrl='https://storage.googleapis.com/afs-prod/media/f94be25ff8784e9593db21a3caeb9b10/2527.jpeg',
        body="World's smallest solvable Rubik's Cube"
    )
    bobbie_post_5 = Post(
        userId=3,
        imageUrl='https://www.guinnessworldrecords.com/Images/largest-rubiks-cube_tcm25-564380.jpg?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2',
        body="Had a blast at the science museum today 😎"
    )
    cuberdude98_post_1 = Post(
        userId=4,
        imageUrl='https://i.ytimg.com/vi/cExtbByvAEw/maxresdefault.jpg',
        body="Anyone can solve a 3x3 when it's self solving 😁"
    )
    cuberdude98_post_2 = Post(
        userId=4,
        imageUrl='https://www.guinnessworldrecords.com/Images/Tommy-Cherry-blindfolded-solving-rubiks-cube_tcm25-689387.jpg',
        body="🏆 It's almost easier for me to blind solve a 3x3 than it is to solve one looking"
    )
    cuberdude98_post_3 = Post(
        userId=4,
        imageUrl='https://img.redbull.com/images/c_crop,x_540,y_0,h_3840,w_4800/c_fill,w_800,h_628/q_auto,f_auto/redbullcom/2020/11/3/s42ceghhdiyexbsmrn8z/giovanni-contardi-red-bull-rubiks-cube-world-cup-art',
        body='😵🤯😵🤯'
    )



    db.session.add(demo_post_2)
    db.session.add(bobbie_post_5)
    db.session.add(cuberdude98_post_1)
    db.session.add(marnie_post_2)
    db.session.add(bobbie_post_2)
    db.session.add(marnie_post_1)
    db.session.add(cuberdude98_post_2)
    db.session.add(marnie_post_3)
    db.session.add(bobbie_post_1)
    db.session.add(demo_post_1)
    db.session.add(bobbie_post_4)
    db.session.add(marnie_post_4)
    db.session.add(bobbie_post_3)
    db.session.add(cuberdude98_post_3)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
