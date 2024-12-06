import React, { useState, useEffect } from 'react'
import { json, Link } from 'react-router-dom'
import axios from '../utils/axios'
import noimage from '../../public/no-image.jpg'

function TopNav() {


	const [query, setquery] = useState("") 
     
	const [searches, setsearches] = useState([])

	const getSearches = async()=>{
		try {
			const {data} = await axios.get(`/search/multi?query=${query}`);
			setsearches(data.results)			

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getSearches()
	}, [query])


	return <div className='w-[80%] h-[10vh] relative flex mx-auto items-center pl-[10%] '>
		<i class="ri-search-2-line text-2xl text-zinc-400 "></i>
		<input
			//  target refers to the element that triggered the event
			onChange={(e) => { setquery(e.target.value) }}
			// you are telling React to use the current value of the query
			//The input field always shows the current search query.
			value={query}
			type="text" placeholder='search anything'
			className='w-[40%] mx-10 p-3 text-xl outline-none border-none bg-transparent text-white'
		/>
		{query.length > 0 && <i onClick={() => { setquery("") }} 
		className="ri-close-fill text-2xl text-zinc-400 right-0"></i>}


		<div className='font-semibold w-[50%] left-[16.5%] max-h-[50vh] bg-zinc-200 absolute top-[100%] overflow-auto rounded z-[100] max-[400px]:w-[60%]  '>

			{/* max-h means khud kuch na dikhe jab tak kuch search na kare */}

			{searches.map((item,idx)=>(
				<Link to={`/${item.media_type}/details/${item.id}`} key={idx}
				className='hover:bg-zinc-300 duration-200 max-w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100 max-[800px]:p-2'>

				<img
				className='max-w-[15vh] h-[12vh] object-cover rounded-md mr-10 shadow-lg max-[400px]:h-[5vh] m' 
				src= {
					item.backdrop_path || item.profile_path ?
					`https://image.tmdb.org/t/p/original/${
					item.backdrop_path || item.profile_path
				}`: noimage} 
					alt="" />

				<span>{
				item.original_title || 
				item.title||
				item.name || 
				item.original_name
				}</span>
			</Link>
			))}


		</div>
	</div>
}

export default TopNav