import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/no-image.jpg";

function HorizontalCards({ data }) {
	// console.log(data.media_type);

	return (

		<div className='w-[100%] flex  overflow-y-hidden mb-5 p-5 hori'>

			{data.length > 0 ? data.map((dt, idx) =>
				<Link to={`/${dt.media_type}/details/${dt.id}`}
					key={idx} className='min-w-[15%] h-[45vh] mr-5  bg-zinc-900' >

					<img className='w-full h-[55%] object-cover'
						src={dt.backdrop_path || 
							dt.poster_path ||
							dt.profile_path
							? `https://image.tmdb.org/t/p/original/${dt.backdrop_path ||
							dt.poster_path || dt.profile_path
							}`: noimage
							 
						}
						alt="" />

					<div className='text-white p-3 h-[45%] overflow-y-auto'>

						<h1 className=' text-xl font-semibold '
						>{
								dt.original_title ||
								dt.title ||
								dt.name ||
								dt.original_name
							}</h1>

						<p className=''>
							{dt.overview.slice(0, 50)} ... <span className='text-zinc-400'>more</span>
						</p>

					</div>
				</Link>): <h1 className='text-4xl text-white font-black text-center mt-6'>Nothing to Show</h1>
			}
		</div>
	)
}

export default HorizontalCards