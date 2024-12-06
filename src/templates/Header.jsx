import React from 'react'
import { Link } from 'react-router-dom'

// FOR DISPLAY trending MOVIES 

function Header({ data }) {
	return (
		<div style={{
			background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6)),

		url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,

			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat'

		}}
			className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%] min-[90px]:text-[10px] p-[3%]'>

			<h1 className='w-[60%] text-4xl font-black text-white min-[90px]:'
			>{
					data.original_title ||
					data.title ||
					data.name ||
					data.original_name
				}</h1>

			<p className='mt-3 w-1/3 text-white mb-2 text-[13px]
			'>{data.overview.slice(0, 100)} ...
			<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link>
			</p>

			<p className='text-white text-[12px]'>
				<i className="ri-megaphone-fill text-yellow-500"></i>{data.release_date || "Soon"}
				<i className="ri-film-fill text-yellow-500 ml-4"></i>{data.media_type.toUpperCase()}

			</p>

			<Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-2 bg-[#6556CD] rounded-lg text-white font-semibold mt-4 text-[11px]'>
				watch trailer
			</Link>
		</div>
	)
}

export default Header