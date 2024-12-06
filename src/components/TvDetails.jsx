import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../templates/Loading';
import HorizontalCards from '../templates/HorizontalCards'
import { removetv } from '../store/reducers/TvSlice';
import { asyncloadtv } from '../store/actions/TvActions';

function TvDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //THIS LOCATION GIVE ME A PATH NAME
  const { pathname } = useLocation()

  // movie se isliye data nikal rahe hai kyu ki , humne movieReducer mai mai store kar rakha hai
  const { info } = useSelector(state => state.tv)

  useEffect(() => {

    dispatch(asyncloadtv(id));

    return () => { // jab mai ise page se bhar jau toh movie hat jaye
      dispatch(removetv())
    }
  }, [id])

  return info ? <div style={{

    background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6)),

  url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'

  }}

    className='relative w-screen h-[220vh] px-[10%] '>

    {/* PART 1 NAVIGATION */}

    <nav className='w-full h-[10vh]  text-zinc-200 flex gap-10 items-center text-2xl'>

      <i onClick={() => navigate(-1)}
        class="ri-arrow-left-circle-line ">

      </i>

      {/* hum nhi chahte ki humara webpage miss ho jaye */}
      <a target='_blank' href={info.detail.homepage}><i class="ri-external-link-fill "></i>
      </a>

      <a target='_blank' href={`https://simple.wikipedia.org/wiki/${info.detail.original_title}`}>
        <i class="ri-global-line "></i>
      </a>

      <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} >IMDB
      </a>
      {/* imdb link copy from chrome like write name of movie and imdb */}
    </nav>

    {/* PART 2 POSTER AND DETAIL  */}



    <div className='w-full flex  max-[700px]:flex-col h-full'>

      <img
        className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[50vh]  object-cover'
        src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt=""
      />


      <div className='content  ml-[5%] text-white'>
        <h1 className=' text-5xl font-black'>
          {info.detail.name ||
            info.detail.original_name ||
            info.detail.title ||
            info.detail.original_title}

          <small className='text-3xl font-semibold text-zinc-300'>({info.detail.first_air_date.split('-')[0]})</small>
        </h1>

        <div className='flex  items-center gap-x-6 mt-5 mb-5'>
          <span className=' text-white text-lg font-semibold w-[6vh] h-[6vh] rounded-full bg-yellow-600 flex justify-center items-center '>
            {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
          </span>

          <h1 className='w-[3.5vw] font-semibold text-2xl leading-6'>User Rating</h1>
          <h1>{info.detail.first_air_date}</h1>
          <h1>{info.detail.genres.map((e) => e.name).join(' , ')}</h1>
          <h1>{info.detail.runtime} min</h1>
        </div>

        <h1 className='text-3xl font-semibold italic '>{info.detail.tagline}</h1>

        <h1 className='text-2xl mt-5 font-medium mb-3'>Overview</h1>
        <p>{info.detail.overview}</p>

        <h1 className='text-2xl mt-5 font-medium mb-3'>Tv Translated</h1>

        <p className='mb-10'>{info.translations.join(', ')}</p>

        <Link className='text-xl py-4 px-6 bg-[#6556cd] rounded-xl'
          to={`${pathname}/trailer`}>
          <i className="ri-play-fill text-xl mr-3"></i>
          Play Trailer
        </Link>

      </div>

    </div>



    {/* PART 3 AVAILABLE ON PLATFORMS  */}

    <div className='w-[80%] flex flex-col gap-y-5 mt-10' >



      {info.watchproviders &&
        info.watchproviders.flatrate &&
        <div className='flex gap-x-10 items-center text-white '>

          <h1>Available on Platforms</h1>
          {info.watchproviders.flatrate.map((w, i) => (
            <img
              key={i}
              title={w.provider_name}
              className='w-[6vh] h-[6vh] object-cover rounded-md '
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt='' />))}

        </div>
      }


      {info.watchproviders &&
        info.watchproviders.rent &&
        <div className='flex gap-x-10 items-center text-white '>

          <h1>Available on Rent</h1>
          {info.watchproviders.rent.map((w) => (
            <img
              title={w.provider_name}
              className='w-[6vh] h-[6vh] object-cover rounded-md '
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt='' />))}

        </div>
      }



      {info.watchproviders &&
        info.watchproviders.buy &&
        <div className='flex gap-x-10 items-center text-white '>

          <h1>Available to Buy</h1>
          {info.watchproviders.buy.map((w) => (
            <img
              title={w.provider_name}
              className='w-[6vh] h-[6vh] object-cover rounded-md '
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt='' />))}

        </div>
      }

    </div>

    {/* Seasons */}

    <hr className='mt-10 border-none h-[0.3vh] bg-zinc-500' />

    <h1 className='text-3xl font-bold mt-5 mb-2 text-white'>Seasons</h1>

    <div className='w-[100%] flex  overflow-y-hidden mb-5 p-5'>

      {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
        <div className='w-[15vh] mr-[12%]'>
          <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[30vh] min-w-[14vw] object-cover'
            src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt="" />

          <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
            {s.name}
          </h1>
        </div>
      )) : <h1 className='text-4xl text-white font-black text-center mt-6'>Nothing to Show</h1>}



    </div>


    {/* Part - 4 RECOMMENDATIONS */}

    <hr className='mt-10 border-none h-[0.3vh] bg-zinc-500' />

    <h1 className='text-3xl font-bold mt-5 mb-2 text-white'>Recommendations & Similar Stuff</h1>

    <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />

    <Outlet />

  </div> : <Loading />
}

export default TvDetails