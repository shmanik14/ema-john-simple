import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializaLoginFramework, handleGoogleSignIn, handleFbSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    photo: ''
  });

  initializaLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  const FbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  const SignOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(newUser, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  const handleChange = (e) => {
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={SignOut}>Sign Out</button> : 
        <button onClick={GoogleSignIn}>Sign In</button>
      }
      <br/><button onClick={FbSignIn}>Sign In using Facebook</button>
      
      {
        user.isSignedIn && 
        <div>
          <p>welcome, {user.name}</p>
          <p>welcome, {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleChange} name="name" placeholder="Your Name"/>}<br/>
        <input type="text" onBlur={handleChange} name="email" placeholder="Your Email Address" required/><br/>
        <input type="password" onBlur={handleChange} name="password" placeholder="Password" required/><br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'logged in'} Successfully</p>}
      </form>
    </div>
  );
}

export default Login;
