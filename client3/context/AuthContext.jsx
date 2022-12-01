import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from 'peerjs'


export const AuthContext = createContext()
export const PeerContext = createContext()

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(null)
    const [friendList, setFriendList] = useState([])
    const [peer, setPeer] = useState()
    const navigate = useNavigate()

    useEffect(() => {
      if(!auth) navigate('/login')
      else {
        const p = new Peer(auth.user['_id'], {
            host: 'localhost',
            port: 5001,
            path: '/'
        })
        const friends = auth.user['friendList']
        setFriendList(friends)
        setPeer(p)
        navigate('/')
      }
    }
    , [auth])

    function authenticateUser(user) {
        setAuth({user})
    }
    return (
        <AuthContext.Provider value={{authUser: auth, friendList, authenticateUser}}>
            <PeerContext.Provider value={peer}>
            {children}
            </PeerContext.Provider>
        </AuthContext.Provider>
    )
}