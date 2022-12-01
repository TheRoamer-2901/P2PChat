import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Navbar from '../components/Navbar'
import Friend from '../pages/Friend'
import Chat from '../pages/Chat'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/signup' element={ <SignUpForm />} />
        <Route path='/login' element={ <LoginForm />} />
        <Route path='/' element={ <Chat />} />
        <Route path='/friend' element={ <Friend />} />
      </Routes>
    </>
  )
}

export default App
