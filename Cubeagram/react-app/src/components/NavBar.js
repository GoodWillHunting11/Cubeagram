import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"
import { useDispatch, useSelector } from "react-redux";
import Cubeagram2 from "../img/Cubeagram2.png"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      {!sessionUser &&
      <ul className='ul-nav'>
        <div className='navbar-cube'>
          <li>
            <img id="nav-cube-logo" src={Cubeagram2} />
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </div>
      </ul>}
      {sessionUser &&
        <div className='navbar-cube'>
          <div className='navbar-left'></div>
          <div className='navbar-mid'>
            <div className='main-nav'>
              <div className='mid-left-nav'>
                <img id="nav-cube-logo" src={Cubeagram2} />
              </div>
              <div className='mid-right-nav'>
                <input
                  id='search-nav'
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className='navbar-right'>
            <div className='navbar-button-group'>
              <div className='home-button-nav'>
                <NavLink to='/' exact={true} activeClassName='active'>
                  <i id="nav-house" class="fa-solid fa-house"></i>
                </NavLink>
              </div>
              <div className='plus-button-nav'>
                <Link to="/post/new"><i id='nav-plus' class="fa-solid fa-square-plus"></i></Link>
              </div>
              <div className='nav-profile-pic'>
                <img id='nav-profile-pic' src={sessionUser.imageUrl} />
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
