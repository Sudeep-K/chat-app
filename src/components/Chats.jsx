import { onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from './../AuthContext';
import { ChatContext } from './../ChatContext';

const Chats = () => {
    const [chats, setChats] = React.useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
        
        return () => unsub();
      }

      currentUser.uid && getChats();
    }, [currentUser.uid])

    const handleConversation = (userInfo) => {
      dispatch({ type: 'CHANGE_USER', payload: userInfo })
    } 

  return (
    <div className="chat">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
        <div className="userInfo" onClick={ () => handleConversation(chat[1].userInfo) }>
        <img src={chat[1].userInfo.photoURL} alt="user" />
        <div className="userInfoText">
          <span className="username">{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text.substring(0, 30) || <b>New to Buzz chat</b>}...</p>
        </div>
      </div>)
      )
    }
    </div>
  )
}

export default Chats