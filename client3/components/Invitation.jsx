import './Invitation.css'

const user = "Khoa"

const Invitation = () => {
  return (
    <div className='invitation'>
        <div>You have an invitation from {user}</div>
        <button className='accept-btn'>Accept</button>
        <button className='deny-btn'>Deny</button>
    </div>
  )
}

export default Invitation