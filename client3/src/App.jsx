import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Chat from '../pages/Chat'
import { Routes, Route } from 'react-router-dom'

function App() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if(!auth) navigate('/login')
    else navigate('/')
  }
  , [auth])
  return (
    <>
      <Routes>
        <Route path='/' element={ <Chat />} />
        <Route path='/login' element={ <LoginForm />} />
        <Route path='/signup' element={ <SignUpForm />} />
      </Routes>
    </>
  )
}

export default App
