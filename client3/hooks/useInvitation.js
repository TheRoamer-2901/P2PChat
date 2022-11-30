import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";

export function useInvitation(userId) {
    const [invitationList, setInvitationList] = useState([])
    const socket = useSocket()

    function updateUserList() {
        socket.emit('invitation-sent', userId)
        socket.on('invitation-returned', invitations => {
            setInvitationList(invitations)
        })
    }
    useEffect(() => {
        updateUserList()
    }, [])
   
    socket.on('invitation-update', userList => {
        updateUserList()
    })

    return invitationList
}