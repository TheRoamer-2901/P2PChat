import './Form.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import './Form.css'

const SignUpForm = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const passRef = useRef()
    const confirmRef = useRef()
    const socket = useSocket()

    function handleSignUp(e) {
        e.preventDefault()
        const userName = nameRef.current.value
        const password = passRef.current.value
        const confirmPassword = confirmRef.current.value
        if(password !== confirmPassword) {
            console.log('you must enter the same password');
            return;
        }
        socket.emit('signUp', {name: userName, password: password})


    }

    return (
        <div className="form-background">
            {open &&
            <form className='form' onSubmit={(e) => handleSignUp(e)}>

                <h1>Sign Up</h1>
                <div>
                    <input placeholder='Username...' ref={nameRef}/>
                </div>
                <div>
                    <input placeholder='Password...' type='password' ref={passRef}/> 
                </div>
                <div>
                    <input placeholder='Confirm password...' type='password' ref={confirmRef}/> 
                </div>
                <button className='back-btn' onClick={() => {navigate('/login')}}>
                    Back to log in
                </button>
                <button className='signup-btn'>Sign Up</button>

            </form>
            }

        </div>
    )
}

export default SignUpForm