import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getAllUsers } from "../../store/user";
import './SearchResults.css'

function SearchResults() {
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log('use params', useParams())
    const allUsers = useSelector(state => state.userState.entries)
    console.log('param id', id)
    console.log('all users', allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    },[dispatch])

    function findSearchedUsers() {
        let newUserArr = []
        for(let i = 0; i < allUsers.length; i++){
            let user = allUsers[i]
            console.log('each user in func', user?.username)
            console.log('params', id)
            if(user?.username?.toLowerCase()?.includes(id?.toLowerCase())) newUserArr?.push(user)
        }
        return newUserArr;
    }

    const finalUsers = findSearchedUsers()
    console.log('----->', finalUsers)
    if(finalUsers.length > 0){
    return (
        <div className="main-container-search">
            <h1 id='search-results-for'>SearchResults For: {id}</h1>
            {finalUsers?.map(user => (
                <div className="each-user-search" key={user?.id}>
                    <img id='profile-pic-search' src={user?.imageUrl} alt='profile'></img>
                    <Link to={`/user/${user?.id}`}><h2>{user?.username}</h2></Link>
                </div>
            ))}
        </div>
    )
            }
    return (
        <div>
            <div className="main-container-search2">
                <h1 id='search-results-for'>No Search Results for: "{id}"</h1>
                <Link to='/'><h2 id='return-cube-search'>Return To Cubeagram</h2></Link>
            </div>
        </div>
    )
}


export default SearchResults
