import DropDown from '../templates/DropDown';
import React, { useEffect, useState } from 'react'
import TrendCards from '../templates/TrendCards';
import Loading from '../templates/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from '../templates/TopNav';


function Movies() {

	const [categoryForDropDown, setcategoryForDropDown] = useState("now_playing");
	// const [duration, setduration] = useState("day")
	const [movie, setmovie] = useState([]);
	const [page, setpage] = useState(1);
	const [hasMore, sethasMore] = useState(true);
	
	document.title = "Kingflix - Popular " + categoryForDropDown;
	const navigate = useNavigate();

	const getMovie = async () => {
		try {   // in last changing page value
			const { data } = await axios.get(`/movie/${categoryForDropDown}?page=${page}`);

			
			
			if (data.results.length > 0) {
				setmovie((prevstate) => [...prevstate, ...data.results])
				setpage(page + 1);
			} else {
				sethasMore(false)
			}

		} catch (error) {
			console.log(error);
		}
	}


	// ya funcion islliye kyu ki hum jab infinite scroll kar rahe hai toh , hamara page1 repeat ho raha ha toh hum chate hai ki page1 repeat na ho


	const refreshHandler = () => {
		if (movie.length === 0) {
			getMovie()
		}
		else {
			setpage(1);
			setmovie([])
			getMovie()
		}
	}


	useEffect(() => {
		refreshHandler()
	}, [categoryForDropDown])


  return movie.length > 0 ? (
	<div className='w-screen h-screen  '>
		<div className='px-[5%] w-full flex items-center  justify-between'>

			<h1
				className='text-2xl text-zinc-400 font-semibold '>
				<i onClick={() => navigate(-1)}
					className="ri-arrow-left-circle-line hover:text-[#6556cd] text-2xl"></i> 
					Movies
					<small className='ml-2 text-lg text-zinc-600' >({categoryForDropDown})</small>
					</h1>


			<div className='w-[90%] flex items-center max-[700px]:hidden'>

				<TopNav/>
				<DropDown title="Category" options={["popular","top_rated","upcoming","now_playing"]}
					func={(e) => setcategoryForDropDown(e.target.value)} />

				<div className='w-[2%]'></div> 

			</div>

		</div>


	{/*FOR INFINITE SCROLL  */}
	
		<InfiniteScroll
		dataLength={movie.length}
		next={getMovie()}  // JAB DATA KHATAM HO KAYE TOH AGAIN GETtrending KO CALL KARDO
		hasMore={hasMore}
		loader={<h1>Loading...</h1>}  
		>

			<TrendCards data={movie} title={"movie"} />
		</InfiniteScroll>

	</div>
) : <Loading />
}

export default Movies