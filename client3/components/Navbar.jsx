import { useSocket } from '../hooks/useSocket'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './NavBar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const socket = useSocket()
  const { authUser } = useAuth()
  return (
    <div className='navbar'>
      <ul>
          <Link to='/'>Chat</Link>
          <Link to='/friend'>Friend</Link>
          <a targe='_blank' href='http://localhost:8081'>Join a Video Room</a>
      </ul>
      <div className='navright'>
        <div className='username'>{authUser?.user["name"]}</div>
        <button 
          className='logout-btn'
          onClick={() => {
            const userName = authUser?.user["name"]
            socket.emit('logOut', userName)
            navigate('/login')
          }}
        >
          Log out
        </button>
      </div>
    </div>


  )
}

export default Navbar