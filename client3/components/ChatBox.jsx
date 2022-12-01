
import { useFriend } from '../hooks/useFriend';
import Conversation from './Conversation';

import './ChatBox.css'


const ChatBox = ({selectedId}) => {

    let friends = useFriend()
    return (
        <div className="right">
            {
                friends?.map(({friendId, friendName}, i) => {
                    return (
                        <Conversation 
                            friendId={friendId} 
                            friendName={friendName}
                            selectedId={selectedId} 
                            key={i}
                        />
                    )
                })
            }
        
        </div>

  )
}

export default ChatBox