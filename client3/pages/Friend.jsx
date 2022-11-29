import './Friend.css'
import Invitation from '../components/Invitation'
import PendingInvitation from '../components/PendingInvatition'

const Friend = () => {
  return (
    <div className='friend'>
      <div className='invitation-list'>
        <div className='title'>Your Invitation:</div>
        <Invitation />
        <Invitation />
        <Invitation />
        <Invitation />
      </div>
      <div className='invitation-list'>
        <div className='title'>Pending Invitation:</div>
        <PendingInvitation />
        <PendingInvitation />
        <PendingInvitation />
        <PendingInvitation />
      </div>
  </div>
  )
}

export default Friend