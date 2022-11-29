import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import './Form.css'



const LoginForm = () => {
    const nameRef = useRef()
    const passRef = useRef()
    const socket = useSocket()
    const {authenticateUser} = useAuth()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const userName = nameRef.current.value;
        const password = passRef.current.value;
        socket.emit('logIn', {name: userName, password: password});
        socket.on("loginSuccess", (user) => {
            authenticateUser()
        });    
    }

    return (
        <div className="form-background">
            {open &&
            <form className='form' onSubmit={(e) => handleLogin(e)}>

                <h1>Log In</h1>
                <div>
                    <input ref={nameRef} placeholder='Username...' type='text'/>
                </div>
                <div>
                    <input ref={passRef} placeholder='Password...'type='password'/> 
                </div>
                <p >Forgot password?</p>
                <button className='login-btn'>Login</button>
                <p >Not a member? 
                    <span onClick={() => {navigate('/signup')}}> Sign up now</span>
                </p>
            </form>
            }

        </div>
    )
};

export default LoginForm