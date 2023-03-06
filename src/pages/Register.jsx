import React from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db, storage } from '../firebase'

import Filepng from '../assets/file.png'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const  [error, setError] = React.useState(false)
    const [progressbar, setProgressbar] = React.useState('No file selected')
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault()
      const displayName = e.target[0].value
      const email = e.target[1].value
      const password = e.target[2].value
      const file = e.target[3].files[0]
      
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressbar('Upload is ' + progress + '% done');
        },
        (error) => {
          setError(true)
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await setDoc(doc(db, "userChats", res.user.uid), {})
            
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
            
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL
            })
            navigate("/");
          });
        }
      );
    }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Buzz Chat</span>
            <span className="title">Register</span>
            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='display name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <input style={{display: "none"}}type="file" id="file" />
                <label htmlFor="file">
                  <img src={Filepng} />
                  <span>Choose an image file</span>
                </label>
                <button>Sign Up</button>
                {error && <span className="error">Something went wrong</span>}
                <span className="progress">{progressbar}</span>
            </form>
            <p>You have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register