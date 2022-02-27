import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";
import "./ProfilePage.css"

function ProfilePage() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userState.entries)
    const { id } = useParams()
    const user = users.find(user => user.id === +id)
    const posts = useSelector(state => state.postReducer.entries)

    function findUserPosts() {
        let postArr = [];
        for(let i = 0; i < posts.length; i++) {
            let post = posts[i];
            if(post?.userId === user?.id) {
                postArr.push(post)
            }
        }
        return postArr;
    }

    const userPosts = findUserPosts()

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllUsers())
    },[dispatch, id])

    if(!user){
        return (
            <div className="main-not-found">
            <div className="page-not-found">
                <h1 id='error-code'>404</h1>
                <h2 id='not-not-found'>{`User Not Found :(`}</h2>
                <Link id='return-cubeagram' to='/'>Return To Cubeagram</Link>
            </div>
        </div>
        )
    }

    return (
        <div className="user-page-main">
            <div className="left-user-page"></div>
            <div className="mid-user-page">
                <div className="profile-info-div">
                    <div className="profile-pic-user-page">
                        <img id='user-page-profile-pic' alt="user" src={user?.imageUrl} onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/>
                    </div>
                    <div className="profile-name-email">
                        <h2>{user?.username}</h2>
                        <h5>{`${userPosts?.length} posts`}</h5>
                        <h4 id='displayed-email-user'>{user?.email}</h4>
                    </div>

                </div>
                <div className="div-user-line"></div>
                <div className="user-posts-div">
                    {userPosts?.map( post => (
                    <div key={post?.id} className="each-user-post">
                        <Link to={`/post/${post?.id}`}><img id='each-post-image' alt="each post" src={post?.imageUrl} onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/></Link>
                    </div>))}
                </div>
            </div>
            <div className="right-user-page"></div>
        </div>
    )
}

export default ProfilePage
