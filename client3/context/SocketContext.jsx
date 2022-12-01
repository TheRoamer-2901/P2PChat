import { createContext, useEffect, useState } from "react";
import { io } from 'socket.io-client'

export const SocketContext = createContext()



export default function SocketProvider({children}) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const s = io('http://localhost:3000')
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}