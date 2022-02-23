import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomeFeed from './components/HomeFeed';
import { authenticate } from './store/session';
import PostForm from './components/PostForm';
import EditPostForm from './components/EditPostForm';
import SinglePost from './components/SinglePost';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './components/ProfilePage';

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
        <ProtectedRoute path='/' exact={true} >
          <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/post/new' exact={true} >
          <PostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:id/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:id' exact={true}>
          <SinglePost />
        </ProtectedRoute>
        <ProtectedRoute path='/user/:id' exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute>
          <PageNotFound />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
