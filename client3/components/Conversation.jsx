import { useState, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePeer } from '../hooks/usePeer'
import SendIcon from '@mui/icons-material/Send';
import './Conversation.css'

const Message = ( {id, message} ) => {
    const { authUser } = useAuth()
    const userId = authUser?.user["_id"]
    return (
        <div className={id === userId ? 'bubble me' : 'bubble you'}>
            {message}
        </div>
    )
}

function sendMessageToPeer(myPeer, remotePeerId, updateMessages, msg) {
    const conn = myPeer?.connect(remotePeerId)
    conn?.on('open', () => {
        conn.on('data', data => {
            if(!duplicate) {
                updateMessages(data)
                setDuplicate(true)
            }
        })

        conn.send(msg)

    })
    conn?.on('error', (err) => console.log(err))

}

const Conversation = ({friendId, friendName, selectedId}) => {
    const { authUser } = useAuth()
    const authId = authUser?.user["_id"]
    const msgRef = useRef()
    const [messages, setMessages] = useState([])

    function updateMessages(msg) {
        setMessages(prevMsg => {
            return [...prevMsg, msg]
        })
    }
    const peer = usePeer()
    peer?.on('connection', conn => {
        conn.on('open', () => {
            let received = false
            conn.on('data', (data) => {
                if(!received) {
                    updateMessages(data) 
                    received = true    
                }
            }) 
        
        }) 
    })

    peer?.on('error', (err) => console.log(err))


    return (
    <>
        <div className="top"><span>To: <span className="name">{friendName}</span></span></div>
        <div className={friendId === selectedId ? "chat active-chat" : "chat"}>
            {messages.length > 0 &&
            messages.map(({message, id}, i) => {
                return (
                    <Message message={message} id={id} key={i}/>
                )
            })}
            <div className="write">
                <input type="text" ref={msgRef}/>
                <SendIcon 
                    className='icon'
                    onClick={() => {
                        const msg = {id: authId, message: msgRef.current.value}
                        updateMessages(msg)
                        sendMessageToPeer(peer, friendId, updateMessages, msg)
                        msgRef.current.value = ""
                    }}
                />
            </div>
        </div> 

    </>
  
    )
}

export default Conversation