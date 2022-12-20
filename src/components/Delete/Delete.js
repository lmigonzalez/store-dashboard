import './Delete.css'
import React from 'react'

import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../../features/customers/customersSlice'
import { deleteProduct } from '../../features/products/productsSlice'
import { useNavigate } from 'react-router-dom'

const Delete = ({category, item, id, onCancel}) => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	// const category = 'product'
	// const item = 'Lenovo Legion i7'


	const deleteItem = () =>{
		if(category === 'customer'){
			dispatch(deleteCustomer(id))
		}
		if(category === 'product'){
			dispatch(deleteProduct(id))
		}
		navigate(-1)
	}

  return (
	<div className='delete-container'>
		<div>
			<p>{`Are you sure you want to delete ${category}: ${item}`}</p>
			<div className='delete-btn-container'>
				<button onClick={deleteItem}>Delete</button>
				<button onClick={ () => onCancel()}>Cancel</button>
			</div>
		</div>
	</div>
  )
}

export default Delete