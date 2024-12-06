export { removemovie } from '../reducers/MovieSlice'
// Means app movieslice se jo lene hai lelo aur export bhi kardo

import axios from "../../utils/axios";
import { loadmovie } from "../reducers/MovieSlice";

//  MOVIESLICE , WE CANT CHANGE STATE BY  A ASYNC DATA DIRECT INTO 

export const asyncloadmovie = (id) => async (dispatch,getstate) =>{

	try {
		const detail = await axios.get(`/movie/${id}`);
		const externalid = await axios.get(`/movie/${id}/external_ids`);
		const recommendations = await axios.get(`/movie/${id}/recommendations`);
		const similar = await axios.get(`/movie/${id}/similar`);
		const videos = await axios.get(`/movie/${id}/videos`);
		const translations = await axios.get(`/movie/${id}/translations`);
		const watchproviders = await axios.get(`/movie/${id}/watch/providers`);


		let alldetails = {
			detail : detail.data,
			externalid : externalid.data,
			recommendations : recommendations.data.results,
			similar : similar.data.results,
			translations : translations.data.translations.map(t=>t.english_name),
			videos : videos.data.results.find(m => m.type === 'Trailer'),
			watchproviders : watchproviders.data.results.IN,
		};

		dispatch(loadmovie(alldetails)); 

		
		
	} catch (error) {
		console.log(error);
		
		
	}

};
