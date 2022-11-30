import { useState, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import { useInvitation } from '../hooks/useInvitation'
import './Friend.css'
import SearchItem from '../components/SearchItem'
import Invitation from '../components/Invitation'
import PendingInvitation from '../components/PendingInvatition'
import SearchIcon from '@mui/icons-material/Search';

const Friend = () => {
  const [userList, setUserList] = useState([])
  const searchRef = useRef()
  const { authUser } = useAuth()
  const socket = useSocket()
  const invitationList = useInvitation(authUser.user["_id"])
  socket.on('return-user-by-name', userList => {
    setUserList(userList)
  })


  function searchUser() {
    const userName = searchRef.current.value
    socket.emit('getUserByName', userName)
  }
  function updateInvitation(user, option) {
    socket.emit('invitation', {
      senderId: authUser.user["_id"], 
      senderName: authUser.user["name"],
      receiverId: user["_id"],
      receiverName: user["name"]
    }, option)
  }

  return (
    <div className='layout'>
      <div className='search-bar'>
        <div className='search-box'>
          <input 
            ref={searchRef}
            type='text' 
            placeholder='Find a friend to start a conversation...'
            />
          <SearchIcon 
            className='icon'
            onClick={() => searchUser()}
          />
        </div>
        {searchRef.current?.value &&
        <div className='search-result'>
            {userList.map((user, i) => {
              return (
                <SearchItem 
                  key={i} 
                  user={user}
                  update={updateInvitation}
                />
              )
                
            })}
        </div>
        }

      </div>
      <div className='friend'>
        <div className='invitation-list'>
          <div className='title'>Your Invitation:</div>
          {invitationList
          .filter((invitation) => invitation.receiverId === authUser.user["_id"])
          .map((invitation, i) => {
            return (
            <Invitation 
              invitation={invitation}
              update={updateInvitation}
              key={i}
            />
          )})}
        </div>
        <div className='invitation-list'>
          <div className='title'>Pending Invitation:</div>
          {invitationList
          .filter((invitation) => invitation.senderId === authUser.user["_id"])
          .map((invitation, i) => {
            return (
            <PendingInvitation 
              invitation={invitation}
              update={updateInvitation}
              key={i}
            />
          )})}
        </div>
      </div>
    </div>
  )
}

export default Friend