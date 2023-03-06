import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Filepng from '../assets/file.png'
import { auth } from '../firebase'

const Login = () => {
  const [error, setError] = React.useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Buzz Chat</span>
            <span className="title">Login</span>
            <form onSubmit={ handleSubmit }>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button>Sign In</button>
                {error && <span className="error">Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login