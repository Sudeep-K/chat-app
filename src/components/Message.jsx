import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from './../AuthContext';
import { ChatContext } from './../ChatContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  return (
    <div className={`message ${message.sender === currentUser.uid && "owner"}`}>
      <div className="messageProfile">
        <img src={message.sender === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="profile" />
        <p>Just Now</p>
      </div>
      <div className="messageText">
        <span className="text">{message.text}</span>
        {message.img && <img src={message.img} alt="profile" />}
      </div>
    </div>
  )
}

export default Message