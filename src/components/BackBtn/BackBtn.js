
import React from 'react'
import { useNavigate } from 'react-router-dom';
import btn from './BackBtn.module.css'
import { AiOutlineArrowLeft } from "react-icons/ai";


const BackBtn = () => {

	const navigate = useNavigate()
  return (
	<button className={btn.button} onClick={()=> navigate(-1)}>
		<AiOutlineArrowLeft/>
	</button>
  )
}

export default BackBtn