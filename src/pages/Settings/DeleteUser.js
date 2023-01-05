import React, {useState} from 'react'
import DeleteUserStyles from './DeleteUser.module.css'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { populateMessage } from '../../features/notification/notification.Slice'

const DeleteUser = ({onDeleteCancel, userToDelete, getAllUsers, setDeleteUser}) => {

	const dispatch = useDispatch()
	const onConfirm = () =>{
		let id = userToDelete._id
    axios
      .delete('http://localhost:3032/api/delete-user', { data: { id } })
      .then((res) => {
        getAllUsers();
		setDeleteUser(false)
		dispatch(
			populateMessage({
			  message: 'User deleted successfully',
			  messageStatus: true,
			  showNotification: true,
			}))
      })
      .catch((err) => {
		dispatch(
			populateMessage({
			  message: "The user wasn't deleted successfully",
			  messageStatus: false,
			  showNotification: true,
			}))
      });
	}


  return (
	<div className={DeleteUserStyles.options}>
		<p>{`Are you sure you want to delete user ${userToDelete.name}`}</p>
		<div className={DeleteUserStyles.btns}>
			<button onClick={onConfirm}>Confirm</button>
			<button onClick={() => onDeleteCancel()}>Cancel</button>
		</div>
	</div>
  )
}

export default DeleteUser