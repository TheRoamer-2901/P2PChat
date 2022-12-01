import './SearchItem.css'
import { useAuth } from '../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add';

const SearchItem = ({user, update}) => {
  const { authUser } = useAuth()
  const invitation = {
    senderId: authUser.user["_id"], 
    senderName: authUser.user["name"],
    receiverId: user["_id"],
    receiverName: user["name"]
  }
  return (
    <div className='item'>
        <div>{user.name}</div>
        <AddIcon 
          className='icon'
          onClick={() => {
            update(invitation, 'new')
          }}
        />
    </div>
  )
}

export default SearchItem