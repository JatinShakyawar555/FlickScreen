import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from '../templates/TopNav';
import DropDown from '../templates/DropDown';
import TrendCards from '../templates/TrendCards';
import Loading from '../templates/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function Popular() {


	const [categoryForDropDown, setcategoryForDropDown] = useState("movie");
	// const [duration, setduration] = useState("day")
	const [popular, setpopular] = useState([]);
	const [page, setpage] = useState(1);
	const [hasMore, sethasMore] = useState(true);

	document.title = "Kingflix - Popular " + categoryForDropDown;
	const navigate = useNavigate();

	const getPopular = async () => {
		try {   // in last changing page value
			const { data } = await axios.get(`${categoryForDropDown}/popular?page=${page}`);

			// console.log(data);

			if (data.results.length > 0) {
				setpopular((prevstate) => [...prevstate, ...data.results])
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
		if (popular.length === 0) {
			getPopular()
		}
		else {
			setpage(1);
			setpopular([])
			getPopular()
		}
	}


	useEffect(() => {
		refreshHandler()
	}, [categoryForDropDown])


	return popular.length > 0 ? (
		<div className='w-full h-screen  '>
			<div className='px-[5%] w-full flex items-center  justify-between overflow-x-hidden'>

				<h1
					className='text-2xl text-zinc-400 font-semibold max-[700px]:text-md'>
					<i onClick={() => navigate(-1)}
						className="ri-arrow-left-circle-line hover:text-[#6556cd] text-2xl max-[700px]:text-[15px]"></i> Popular</h1>


				<div className='w-[40%] flex items-center max-[700px]:opacity-0 '>

					<TopNav />

				</div>

				<div className='min-w-[30%] flex max-[600px]:flex-col w-[20px] ml-[10px] gap-1 '>

				<DropDown title="Category" options={["movie", "tv"]}
					func={(e) => setcategoryForDropDown(e.target.value)} />


				</div>

				




			</div>


			{/*FOR INFINITE SCROLL  */}

			<InfiniteScroll
				dataLength={popular.length}
				next={getPopular()}  // JAB DATA KHATAM HO KAYE TOH AGAIN GETtrending KO CALL KARDO
				hasMore={hasMore}
				loader={<h1>Loading...</h1>}
			>

				<TrendCards data={popular} title={categoryForDropDown} />
			</InfiniteScroll>

		</div>
	) : <Loading />
}

export default Popular