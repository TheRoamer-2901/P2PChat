
import './Invitation.css'


const Invitation = ({invitation, update}) => {
  const { senderName } = invitation

  return (
    <div className='invitation'>
        <div>You have an invitation from {senderName}</div>
        <div className='group-btn'>
          <button 
            className='accept-btn'
            onClick={() => {
              update(invitation, 'accept')}}
          >
            Accept
          </button>
          <button 
            className='deny-btn'
            onClick={() => {update(invitation, 'deny')}}
          >
            Deny
          </button>
        </div>

    </div>
  )
}

export default Invitation