import { useState } from 'react'
import './Chat.css'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'
import React from 'react'

const Chat = () => {
  const [selectedId, setSelectedId] = useState(-1);
  function selectUser(id) {
    setSelectedId(prevId => {
      if(prevId === id) return -1;
      return id;
    })

  }
  return (
    <div className="chat-page">
        <SideBar 
          selectedId={selectedId} 
          selectUser={selectUser}
        />
        <ChatBox 
          selectedId={selectedId} 
        />
    </div>
  )
}

export default Chat