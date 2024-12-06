import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tvshows from './components/Tvshows'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PeopleDetaills from './components/PeopleDetaills'
import Trailer from './templates/Trailer'
import NotFound from './templates/NotFound'

function App() {
  return <div className='w-screen h-screen bg-[#1F1E24] flex'>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/trending' element={<Trending />} />
      <Route path='/popular' element={<Popular />} />

      <Route path='/movie' element={<Movies />} />

      <Route path='/movie/details/:id' element={<MovieDetails />} >

        <Route path='/movie/details/:id/trailer' element={<Trailer />} />

      </Route>

      <Route path='/tv' element={<Tvshows />} />
      <Route path='/tv/details/:id' element={<TvDetails />} >

        <Route path='/tv/details/:id/trailer' element={<Trailer />} />

      </Route>


      <Route path='/person' element={<People />} />
      <Route path='/person/details/:id' element={<PeopleDetaills />} />

      <Route path='*' element={<NotFound />} />
    </Routes>

  </div>
}

export default App

