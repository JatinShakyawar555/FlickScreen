import DropDown from '../templates/DropDown';
import React, { useEffect, useState } from 'react'
import TrendCards from '../templates/TrendCards';
import Loading from '../templates/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from '../templates/TopNav';

function People() {

	const [categoryForDropDown, setcategoryForDropDown] = useState("popular");
	// const [duration, setduration] = useState("day")
	const [people, setpeople] = useState([]);
	const [page, setpage] = useState(1);
	const [hasMore, sethasMore] = useState(true);
	
	document.title = "Kingflix - Popular " + categoryForDropDown;
	const navigate = useNavigate();

	const getPeople = async () => {
		try {   // in last changing page value
			const { data } = await axios.get(`/person/${categoryForDropDown}?page=${page}`);

			// console.log(data);
			
			if (data.results.length > 0) {
				setpeople((prevstate) => [...prevstate, ...data.results])
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
		if (people.length === 0) {
			getPeople()
		}
		else {
			setpage(1);
			setpeople([])
			getPeople()
		}
	}


	useEffect(() => {
		refreshHandler()
	}, [categoryForDropDown])
  return people.length > 0 ? (
	<div className='w-screen h-screen  '>
		<div className='px-[5%] w-full flex items-center  justify-between'>

			<h1
				className='text-2xl text-zinc-400 font-semibold '>
				<i onClick={() => navigate(-1)}
					className="ri-arrow-left-circle-line hover:text-[#6556cd] text-2xl mr-1"></i> 
					People
					
					</h1>


			<div className='w-[90%] flex items-center '>

				<TopNav/>
				

				<div className='w-[2%]'></div> 

			</div>

		</div>


	{/*FOR INFINITE SCROLL  */}
	
		<InfiniteScroll
		dataLength={people.length}
		next={getPeople()}  // JAB DATA KHATAM HO KAYE TOH AGAIN GETtrending KO CALL KARDO
		hasMore={hasMore}
		loader={<h1>Loading...</h1>}  
		>

			<TrendCards data={people} title={"person"} />
		</InfiniteScroll>

	</div>
) : <Loading />
}

export default People