import React from 'react'
import loader from '../../public/404.gif'

function NotFound() {
	return (
		<div className='w-screen h-screen flex justify-center items-center bg-black'>
			<img className='h-[80%] object-cover' src={loader} alt="" />
		</div>
	  )
}

export default NotFound