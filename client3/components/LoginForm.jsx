import { useNavigate } from 'react-router-dom'
import './Form.css'

const handleLogin = (nav) => {
    nav('/')
}

const LoginForm = () => {
    const navigate = useNavigate()
    return (
        <div className="form-background">
            {open &&
            <form className='form' onSubmit={() => handleLogin(navigate)}>

                <h1>Log In</h1>
                <div>
                    <input placeholder='Username...'/>
                </div>
                <div>
                    <input placeholder='Password...'/> 
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