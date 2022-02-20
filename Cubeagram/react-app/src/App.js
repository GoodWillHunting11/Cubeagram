import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomeFeed from './components/HomeFeed';
import { authenticate } from './store/session';
import PostForm from './components/PostForm';
import EditPostForm from './components/EditPostForm';
import CommentForm from './components/CommentForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.user?.session)
  console.log('session user',sessionUser)
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/post/new' exact={true} >
          <PostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:id/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:id/comment/new'>
          <CommentForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
