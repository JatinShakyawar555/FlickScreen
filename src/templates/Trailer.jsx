import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

function Trailer() {

	const { pathname } = useLocation();
    const navigate = useNavigate()
    
	//Hum check kar rahe hai kya path mai movie inckudes hai
	const category = pathname.includes("movie") ? "movie" : "tv"
	const ytvideo = useSelector((state) => state[category].info.videos);




	return (
		<div className='absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.9)] '>

			 <Link 
			 onClick={() => navigate(-1)}
			 className="ri-close-fill absolute text-white top-[4%] right-[2%] text-4xl max-[700px]:text-xl"
			 ></Link>

			 {ytvideo ? (
				<ReactPlayer
				controls
				height={750}
				width={1500}
				url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
			/>
			 ): <NotFound/>}

			
		</div>
	) 
}

export default Trailer