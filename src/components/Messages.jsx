import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../ChatContext';
import { db } from '../firebase';
import Message from './Message';

const Messages = () => {
    const [chats, setChats] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
      try {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setChats(doc.data().messages);
        });
  
        return () => {
          unSub();
        }
      } catch (error) {
        console.log(error)
      }
    }, [data.chatId])

  return (
    <div className="messages">
      {chats?.map(m => {
        return <Message message={m} key={m.id}/>
      })}
    </div>
  )
}

export default Messages