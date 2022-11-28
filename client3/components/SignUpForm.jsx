import './Form.css'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const navigate = useNavigate()
    return (
        <div className="form-background">
            {open &&
            <form className='form'>

                <h1>Sign Up</h1>
                <div>
                    <input placeholder='Username...'/>
                </div>
                <div>
                    <input placeholder='Password...'/> 
                </div>
                <div>
                    <input placeholder='Confirm password...'/> 
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