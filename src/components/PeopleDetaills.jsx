import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadpeople, removepeople } from '../store/actions/PersonAction';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../templates/Loading';
import HorizontalCards from '../templates/HorizontalCards'
import DropDown from '../templates/DropDown';

function PeopleDetaills() {

  const [categoryForDropDown, setcategoryForDropDown] = useState("movie");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //THIS LOCATION GIVE ME A PATH NAME
  const { pathname } = useLocation()

  // movie se isliye data nikal rahe hai kyu ki , humne movieReducer mai mai store kar rakha hai
  const { info } = useSelector(state => state.person)

  useEffect(() => {

    dispatch(asyncloadpeople(id));

    return () => { // jab mai ise page se bhar jau toh movie hat jaye
      dispatch(removepeople())
    }
  }, [id])

  console.log(info)

  return info ? (
    <div className='px-[8%] w-screen bg-[#1F1E24] h-[220vh] '>

      {/* PART 1 NAVIGATION */}

      <nav className='w-full h-[10vh]  text-zinc-200 flex gap-10 items-center text-2xl'>

        <i onClick={() => navigate(-1)}
          className="ri-arrow-left-circle-line ">

        </i>
      </nav>



      <div className='w-full flex '>
        {/* Part - 2 Left Poster & Details */}

        <div className='w-[20%] max-[700px]:hidden'>

          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[40vh]  object-cover'
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} alt=""
          />

          <hr className='mt-10 border-none h-[0.3vh] bg-zinc-500' />

          {/* Links  */}

          <div className='text-2xl text-white mt-3 flex gap-x-6'>

            <a target='_blank' href={`https://www.facebook.com/${info.externalid.wikidata_id}`}>
              <i className="ri-global-line"></i>
            </a>

            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className="ri-facebook-line"></i>
            </a>

            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className="ri-instagram-line"></i>
            </a>

            <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
              <i className="ri-twitter-x-line"></i>
            </a>


          </div>

          {/* Personal Info. */}

          <h1 className='text-2xl  text-zinc-400 font-semibold my-5'>Personal Info</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold'>Known For</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.known_for_department}</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold mt-3'>Gender</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"}</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold mt-3'>Birthday</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.birthday}</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold mt-3'>Deathday</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.deathday ? info.detail.deathday : "Alive"}</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold mt-3'>Place of Birth</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.place_of_birth}</h1>

          <h1 className='text-lg  text-zinc-400 font-semibold mt-3'>Also Known As</h1>
          <h1 className='text-lg  text-zinc-400 '>{info.detail.also_known_as.join(', ')}</h1>

        </div>


        {/* Part - 3 right info & details */}

        <div className='w-[80%] ml-[5%]'>

          <h1 className='text-6xl  text-zinc-400 font-bold my-5'>{info.detail.name}</h1>


          <h1 className='text-xl  text-zinc-400 font-semibold'>Biography</h1>
          <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>


          <h1 className='text-lg  text-zinc-400 font-bold my-5 mt-5'>Summary</h1>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className='w-full flex justify-between max-[700px]:flex-col'>

            <h1 className='text-xl  text-zinc-400 font-bold my-5 mt-5'>Acting</h1>

            <DropDown title={"Category"} options={["tv", "movie"]} func={(e) => setcategoryForDropDown(e.target.value)} />


          </div>

          <div className='list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-white border-2 border-zinc-600 p-5'>

            {info[categoryForDropDown + "Credits"].cast.map((c, i) => (
              <li className='hover:text-white p-5 rounded hover:bg-[#1919d] cursor-pointer'>
                <Link to={`/${categoryForDropDown}/details/${c.id}`}>
                  <span>
                    {c.title ||
                    c.name || 
                    c.original_title ||
                    c.original_name}
                  </span>
                  <span className='block ml-5 mt-2' >{c.character}</span>
                </Link>
              </li>
            ))}


          </div>

        </div>

      </div>
    </div>
  ) : <Loading />
}

export default PeopleDetaills