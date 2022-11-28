import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Chat from '../pages/Chat'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Chat />} />
        <Route path='/login' element={ <LoginForm />} />
        <Route path='/signup' element={ <SignUpForm />} />
      </Routes>
 
    </div>
  )
}

export default App
