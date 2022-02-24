# Cubeagram
This is a clone of [Instagram](https://www.instagram.com/)

Cubeagram is a plac for all cubers to get together and share their hobby and sport from 1x1's to 11x11's all cubes are welcome!

# Index
|
[MVP Feature List](https://github.com/GoodWillHunting11/Cubeagram/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/GoodWillHunting11/Cubeagram/wiki/Database-Schema) |
[Redux State Shape](https://github.com/GoodWillHunting11/Cubeagram/wiki/Redux-State-Shape) |
[User Stories](https://github.com/GoodWillHunting11/Cubeagram/wiki/User-Stories) |
[Wire Frame](https://github.com/GoodWillHunting11/Cubeagram/wiki/Wire-Frame) |

# Technologies Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=50/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

# Clone Cubeagram

1. Clone this repository (only this branch)
    
    ```bash
    git clone https://github.com/GoodWillHunting11/Cubeagram.git
    ```
2. Install dependencies

    ```bash
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
   
6. To run the React App, cd into the `react-app` directory.

     ```bash
   npm install
   ```

   ```bash
   npm start
   ```
#Key Features
##Posts
Cubeagram allows users to create a post with an image and a caption talking about their image or experience. When creating a post on Cubeagram Users will
be able to see a preview of what their post will look like before submitting their post. This feature ensures that the user is satisfied with the aesthetic of their post.
Users also have the luxury of updating their caption and deleting their entire post if they no longer wish to share that content.
![Post Preview](https://user-images.githubusercontent.com/30273596/155431740-e77db608-b4f7-4b20-997d-d87b8217e266.PNG)

##Comments
Cubeagram allows users to post a comment on any post so they can share their thoughts about another user's post. Users can update their comments in case of a typo or their
thoughts change about the content. Users can also delete their comment if they no longer wish to share their thoughts on the post.
![Comments](https://user-images.githubusercontent.com/30273596/155431935-7301209f-e6ed-4696-9bcc-a0fcd0141483.PNG)

##User Page
Cubeagram allows users to access their very own user page by clicking their profile image in the nav bar, their username at the top of a post they've made, or their username
displayed on the right side of the home feed. Their user page shows all the posts they've made and they can access each post by clicking on the image displayed for that post.
Users can also access other users profile pages by clicking on the user's username at the top of a post that they created. This will also display all the posts they've made and
can be accessed by clicking on the post's image.
![User Page](https://user-images.githubusercontent.com/30273596/155432365-5d157aad-4512-4b4e-9ee7-713255508cf7.PNG)

# Challenges Highlight
##Modal For Editing a Comment
I originally designed Cubeagram to not use modals but fell in love with the look and interactivity of having a modal to edit a comment. Although it looks simple I had to do
quite a bit of refactoring to implement this feature.
![Edit Comment Modal](https://user-images.githubusercontent.com/30273596/155432984-712dc719-6dfd-47c1-b757-459a6c906ed2.PNG)

##Font Awesome Icons for buttons
In place of buttons I used Icons from Font Awesome. As easy as this may sound, using these icons causes certain issues with functions that were implemented in the buttons so a
bit of refactoring took place to get these to work properly with their onClick functions.
![Font Awesome Icons as Buttons](https://user-images.githubusercontent.com/30273596/155433365-85ccdf44-9d31-47ae-bba9-d6710ce14888.PNG)

#Future Implementations
* Search: allows users to search for other users to view their pages.
* Likes: users will be able to like and unlike posts.
* Followers: users will be able to follow and unfollow other users.
