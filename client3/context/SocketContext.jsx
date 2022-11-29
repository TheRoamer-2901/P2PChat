import { createContext } from "react";
import io from 'socket.io-client'


export const SocketContext = createContext()
const socket = io.connect('http://localhost:3000')


export default function SocketProvider({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}