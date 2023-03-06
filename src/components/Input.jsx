import React from 'react'
import FileAttach from '../assets/attach.png'
import ImageAttach from '../assets/add-file.png'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../AuthContext'
import { ChatContext } from './../ChatContext';
import { arrayUnion, Timestamp, updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ref } from 'firebase/storage';
import { storage } from './../firebase';
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

const Input = () => {
  const [text, setText] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [progressbar, setProgressbar] = React.useState('No file selected')

  const { currentUser } = React.useContext(AuthContext)
  const { data } = React.useContext(ChatContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressbar('Upload is ' + progress + '% done');
          if (progress === 100) {
            setProgressbar('No file selected')
          }
        },
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                sender: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          sender: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId+'.lastMessage']: {
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    })
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId+'.lastMessage']: {
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    })

    setText('')
    setImg(null)
  }

  return (
    <div className="inputContainer">
        <span className="progress">{progressbar}</span>
        <input type="text" placeholder='Type something...' value={text} onChange={ (e) => setText(e.target.value) } />
        <div className="sendOptions">
            <img src={FileAttach} alt="" />
            <input type="file" id="file" style={{display: 'none'}} onChange={ (e) => setImg(e.target.files[0]) }/>
            <label htmlFor="file">
                <img src={ImageAttach} alt="" />
            </label>
            <button onClick={ handleSend }>send</button>
        </div>
    </div>
  )
}

export default Input