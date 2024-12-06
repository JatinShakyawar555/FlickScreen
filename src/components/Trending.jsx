import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopNav from '../templates/TopNav';
import DropDown from '../templates/DropDown';
import axios from '../utils/axios';
import TrendCards from '../templates/TrendCards';
import Loading from '../templates/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function Trending() {

	
	const [categoryForDropDown, setcategoryForDropDown] = useState("all");
	const [duration, setduration] = useState("day")
	const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true) // ya define karta hai ki aur api call karna hai ya nhi 
	
	document.title = "Kingflix - Trending  - " + categoryForDropDown .toUpperCase + 'S' ;
	const gettrendingForCard = async () => {
		try {   // in last changing page value
			const { data } = await axios.get(`trending/${categoryForDropDown}/${duration}?page=${page}`);

			if(data.results.length > 0){ 
				settrending((prevstate) => [...prevstate, ...data.results])
				setpage(page + 1);
			}else{
            sethasMore(false)
			}

		} catch (error) {
			console.log(error);
		}
	}

	
	// ya funcion islliye kyu ki hum jab infinite scroll kar rahe hai toh , hamara page 1 repeat ho raha ha toh hum chate hai ki page1 repeat na ho


	const refreshHandler = ()=>{
		if(trending.length === 0){
			gettrendingForCard()
		}
		else{
			 setpage(1);
			 settrending([])
			 gettrendingForCard()
		}
	}


	useEffect(() => {
		refreshHandler()
	}, [categoryForDropDown, duration])

	const navigate = useNavigate();
	return trending.length > 0 ? (
		<div className='w-screen h-screen  '>
			<div className='px-[5%] w-full flex items-center  justify-between   '>

				<h1
					className='text-2xl text-zinc-400 font-semibold  max-[700px]:text-sm'>
					<i onClick={() => navigate(-1)}
						className="ri-arrow-left-circle-line hover:text-[#6556cd] text-2xl max-[700px]:text-[11px]"></i> Trending</h1>


				<div className='w-[40%] flex items-center max-[700px]:opacity-0 '>
                   
					<TopNav />
				
				</div>

				<div className='min-w-[30%] flex max-[600px]:flex-col w-[20px] mr-[30px] gap-1'>
					 
				<DropDown title="Category" options={["movie", "tv", "all"]}
						func={(e) => setcategoryForDropDown(e.target.value)} />

					<div className='w-[4%]'></div>

					<DropDown title="Duration" options={["day", "week"]}
						func={(e) => setduration(e.target.value)} />
				</div>

			</div>

    
	    {/*FOR INFINITE SCROLL  */}
		
			<InfiniteScroll
			dataLength={trending.length}
			next={gettrendingForCard()}  // JAB DATA KHATAM HO KAYE TOH AGAIN GETtrending KO CALL KARDO
			hasMore={hasMore}
			loader={<h1>Loading...</h1>}  
			>

			<TrendCards data={trending} title={categoryForDropDown} />
			</InfiniteScroll>

		</div>
	) : <Loading />
}

export default Trending