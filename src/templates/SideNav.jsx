import { Link } from 'react-router-dom'

function SideNav() {




	return <div className='w-[20%] h-full border-r-2 border-b-zinc-200 p-10 side  '>
		<h1 className='text-2xl text-white font-bold max-[900px]:text-[3vw] '>
			<i className="text-[#fddc35] ri-movie-fill mr-3  max-[900px]:mr-1 "></i>
			<span>FlickScreen</span>
		</h1>

		<nav className='text-zinc-400 flex flex-col text-xl gap-3  min-[90px]:text-sm'>
			<h1 className='text-white font-semibold text-xl mt-10 mb-5 min-[90px]:text-sm p-2'>New Feed</h1>

			<Link to={'/trending'}
				className='hover:bg-[#5e45ff] hover:text-white rounded duration-300 p-4 '>
				<i className="ri-fire-fill"></i> Trending
			</Link>
			<Link  to={'/popular'}
				className='hover:bg-[#5e45ff] hover:text-white rounded duration-300 p-4'>
				<i className="ri-sparkling-fill"></i> Popular
			</Link>
			<Link to={'/movie'}
				className='hover:bg-[#5e45ff] hover:text-white rounded duration-300 p-4'>
				<i className="ri-movie-2-line"></i> Movies
			</Link>
			<Link to={'/tv'}
				className='hover:bg-[#5e45ff] hover:text-white rounded duration-300 p-4'>
				<i className="ri-slideshow-3-fill"></i> TV Shows
			</Link>
			<Link to={'/person'}
				className='hover:bg-[#5e45ff] hover:text-white rounded duration-300 p-4'>
				<i className="ri-global-line"></i> People
			</Link>
		</nav>

		<hr className='border-none h-[0.1vw] bg-zinc-400' />

	</div>
}

export default SideNav