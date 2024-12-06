import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/no-image.jpg";

function TrendCards({ data, title }) {
	console.log(title);

	return (
		<div className='flex flex-wrap w-full px-[10%] bg-[#1F1E24] '>
			{data.map((d, i) => (
				<Link to={`/${d.media_type || title}/details/${d.id}`}

					className='relative w-[25vh] mr-[5%] mb-[5%]' key={i}>

					<img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[40vh]  object-cover'
						src={
							d.backdrop_path ||
							d.profile_path || 
							d.poster_path ? 
							`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}` : noimage
						} alt="" />

					<h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
						{d.original_title || d.title || d.original_name}
					</h1>

					{/* AVRERGAE VOTE HAI TOH HI DEKHAO */}
					{d.vote_average && (<div className='absolute right-[-13%] bottom-[30%] text-white text-lg font-semibold w-[6vh] h-[6vh] rounded-full bg-yellow-600 flex justify-center items-center '>
						{(d.vote_average * 10).toFixed()} <sup>%</sup>
					</div>)}

				</Link>
			))}
		</div>
	)
}

export default TrendCards