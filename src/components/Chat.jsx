import React, { useContext } from 'react'
import Call from '../assets/call.png'
import Add from '../assets/add.png'
import More from '../assets/more.png'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from './../ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="header">
        <span className="username">{data.user?.displayName}</span>
        <div className="icons">
          <img src={Call} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat