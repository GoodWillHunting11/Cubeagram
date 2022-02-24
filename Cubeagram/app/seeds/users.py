from app.models import db, User


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Scramble.svg/1200px-Scramble.svg.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', imageUrl='https://news.mit.edu/sites/default/files/download/201106/d20110630103402-0.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', imageUrl='https://thumbor.forbes.com/thumbor/trim/0x23:3641x2071/fit-in/711x399/smart/https://specials-images.forbesimg.com/imageserve/5faf069db62f389a97a6d78e/Erno-Rubik--inventor-of-the-Rubik-s-Cube--holding-one-of-his-Rubik-s-Cube-puzzles-/0x0.jpg')
    cuber_dude98 = User(
        username='cuber_dude98', email='cuberdude98@aa.io', password='password', imageUrl='https://augustman-uploads.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/sites/2/2022/02/17094533/GAE-2100RC-1A_theme11.jpg'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(cuber_dude98)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
