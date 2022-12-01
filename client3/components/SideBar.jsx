import { useEffect } from 'react'
import { useFriend } from '../hooks/useFriend'
import './SideBar.css'


const UserItem = ({id, selectedId, name, selectUser}) => {
    return (
        <li 
            className={id === selectedId ? "person active" : "person"}
            onClick={() => {
                selectUser(id)}
            }
        >
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
            <span className="name">{name}</span>
            <span className="time">2:09 PM</span>
            <span className="preview">I was wondering...</span>
        </li>
    )
}

const SideBar = ({selectedId, selectUser}) => {
    let onlineFriends = useFriend()
    /*
    useEffect(() => {
        onlineFriends = authUser?.user['friendList'].filter(friend => {
            onlineUid.includes(friend.friendId)
        })
        // console.log('eff: ', onlineFriends);
    }, [authUser, onlineUid])
    */
    return (
        <div className="sidebar">
            <div className="top">
                <input type="text" placeholder="Search" />
            </div>
            <ul className="people">
                {onlineFriends?.map(({friendId, friendName}, i) => {
                    return (
                        <UserItem 
                            key={i}
                            id={friendId}
                            selectedId={selectedId}
                            name={friendName}
                            selectUser={selectUser}
                        />
                )})}
            </ul>
        </div>
    )
}

export default SideBar