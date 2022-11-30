import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <ul>
        <Link to='/'>Chat</Link>
        <Link to='/friend'>Friend</Link>
    </ul>
  )
}

export default Navbar