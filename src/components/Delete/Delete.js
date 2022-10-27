import './Delete.css'
import React from 'react'

const Delete = ({category, item, onCancel}) => {

	// const category = 'product'
	// const item = 'Lenovo Legion i7'

  return (
	<div className='delete-container'>
		<div>
			<p>{`Are you sure you want to delete ${category}: ${item}`}</p>
			<div className='delete-btn-container'>
				<button>Delete</button>
				<button onClick={ () => onCancel()}>Cancel</button>
			</div>
		</div>
	</div>
  )
}

export default Delete