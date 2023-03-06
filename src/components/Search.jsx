import React, { useContext } from 'react'
import { useEffect } from 'react';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from './../AuthContext';
import { ChatContext } from './../ChatContext';

const Search = () => {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  }

  const handleSelect = async () => {
    const combinedId = [currentUser.uid, user.uid].sort().join('');
    try {
      const res = await getDoc(doc(db, 'conversations', combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []})

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+'.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+'.date']: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+'.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+'.date']: serverTimestamp()
        })
      } else {
        dispatch({ type: 'CHANGE_USER', payload: user })
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null)
    setUsername('')
  }

  useEffect(() => {
    if (username === '') setUser(null);
    handleSearch();
  }, [username])

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user..." value={username} onChange={ (e) => setUsername(e.target.value)}/>
      </div>
      {user && <div className="userInfo" onClick={ handleSelect }>
        <img src={user.photoURL} alt="user" />
        <div className="userInfoText">
          <span className="username">{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search