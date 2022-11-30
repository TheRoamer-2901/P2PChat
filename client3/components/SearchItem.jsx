import './SearchItem.css'
import AddIcon from '@mui/icons-material/Add';

const SearchItem = ({user, update}) => {
  return (
    <div className='item'>
        <div>{user.name}</div>
        <AddIcon 
          className='icon'
          onClick={() => {
            update(user, 'new')
          }}
        />
    </div>
  )
}

export default SearchItem