import './SideBar.css'

const users = [
    {id: 0, userName: "Thomas Bangalter"},
    {id: 1, userName: "Thomas Bangalter"},
    {id: 2, userName: "Thomas Bangalter"},
    {id: 3, userName: "Thomas Bangalter"},
    {id: 4, userName: "Thomas Bangalter"},
    
]

const UserItem = ({id, selectedId, userName, selectUser}) => {
    return (
        <li 
            className={id === selectedId ? "person active" : "person"}
            onClick={() => {
                selectUser(id)}
            }
        >
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
            <span className="name">{userName}</span>
            <span className="time">2:09 PM</span>
            <span className="preview">I was wondering...</span>
        </li>
    )
}

const SideBar = ({selectedId, selectUser}) => {
    return (
        <div className="sidebar">
            <div className="top">
                <input type="text" placeholder="Search" />
            </div>
            <ul className="people">
                {users.map(({id, userName}, i) => {
                    return (
                        <UserItem 
                            key={i}
                            id={id}
                            selectedId={selectedId}
                            name={userName}
                            selectUser={selectUser}
                        />
                )})}
            </ul>
        </div>
  )
}

export default SideBar