import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Navbar from '../components/Navbar'
import Friend from '../pages/Friend'
import Chat from '../pages/Chat'
import { Routes, Route } from 'react-router-dom'

function App() {
  const { authUser } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if(!authUser) navigate('/login')
    else navigate('/')
  }
  , [authUser])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Chat />} />
        <Route path='/login' element={ <LoginForm />} />
        <Route path='/signup' element={ <SignUpForm />} />
        <Route path='/friend' element={ <Friend />} />
      </Routes>
    </>
  )
}

export default App
