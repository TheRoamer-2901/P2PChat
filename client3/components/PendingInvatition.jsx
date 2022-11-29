import './PendingInvitation.css'

const user = "Khoa"

const PendingInvitation = () => {
  return (
    <div className='invitation'>
        <div>You have sent {user} an invitation </div>
        <button className='cancel-btn'>Cancel</button>
    </div>
  )
}

export default PendingInvitation