import React from 'react'
import userStatusStyles from './UserStatus.module.css'
import { useDispatch } from 'react-redux'
import { populateMessage } from '../../features/notification/notification.Slice'
import axios from 'axios'

const UserStatus = ({userToChange, onChangeCancel, userStatusValue, getAllUsers, setChangeUser}) => {
	const dispatch = useDispatch()

	const onStatusChange = () =>{
		axios
		.patch('http://localhost:3032/api/update-user-status', {
		  id: userToChange._id,
		  isAdmin: userStatusValue,
		})
		.then(() => {
		  getAllUsers();
		  setChangeUser(false)
		  dispatch(
			populateMessage({
			  message: 'User updated successfully',
			  messageStatus: true,
			  showNotification: true,
			}))
		})
		.catch(() => {
			dispatch(
				populateMessage({
				  message: "The user wasn't updated successfully",
				  messageStatus: false,
				  showNotification: true,
				}))
		});
	}
  return (
	<div className={userStatusStyles.options}>
	<p>{`Are you sure you want to update user ${userToChange.name} status?`}</p>
	<div className={userStatusStyles.btns}>
		<button onClick={onStatusChange}>Confirm</button>
		<button onClick={() => onChangeCancel()}>Cancel</button>
	</div>
</div>
  )
}

export default UserStatus