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
      </ul>
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


  )
}

export default Navbar