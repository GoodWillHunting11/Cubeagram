import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"
import { useSelector } from "react-redux";
import Cubeagram2 from "../img/Cubeagram2.png"
import { useState } from 'react';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const [search, setSearch] = useState('')

  function handleSubmit(){
    if(search.length > 0){
      history.push(`/search/${search}`)
      setSearch('')
    }
  }

  return (
    <nav>
      {sessionUser &&
        <div className='navbar-cube'>
          <div className='navbar-left'></div>
          <div className='navbar-mid'>
            <div className='main-nav'>
              <div className='mid-left-nav'>
                <img alt='logo' id="nav-cube-logo" src={Cubeagram2} />
              </div>
              <div className='searchBar-Nav'>
                <input
                  id='search-bar-nav'
                  type='text'
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                  required
                  autoComplete='off'
                  />
                <button onClick={handleSubmit} id='submit-search-nav' type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
          </div>
          <div className='navbar-right'>
            <div className='navbar-button-group'>
              <div className='home-button-nav'>
                <NavLink  to='/' exact={true} activeClassName='active'>
                  <i id="nav-house" className="fa-solid fa-house"></i>
                </NavLink>
              </div>
              <div className='plus-button-nav'>
                <NavLink to="/post/new"><i id='nav-plus' className="fa-solid fa-square-plus"></i></NavLink>
              </div>
              <div className='nav-profile-pic'>
                <NavLink to={`/user/${sessionUser?.id}`} ><img alt='profile' id='nav-profile-pic' src={sessionUser.imageUrl} onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/></NavLink>
              </div>
              <div className='logout-button-nav'>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>}
    </nav>
  );
}

export default NavBar;
