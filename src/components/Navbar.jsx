import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './../AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="navbar">
        <div className="logo">Buzz Chat</div>
        <div className="userProfile">
            <img src={ currentUser.photoURL } />
            <span className="username">{currentUser.displayName}</span>
            <button onClick={ () => signOut(auth)}>Log out</button>
        </div>
    </div>
  )
}

export default Navbar