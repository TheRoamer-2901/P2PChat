import './PendingInvitation.css'

const PendingInvitation = ({invitation, update}) => {
  const { receiverName } = invitation

  return (
    <div className='pending-invitation'>
        <div>You have sent {receiverName} an invitation </div>
        <button 
          className='cancel-btn'
          onClick={() => {update(invitation,'deny')}}
        >
          Cancel
        </button>
    </div>
  )
}

export default PendingInvitation