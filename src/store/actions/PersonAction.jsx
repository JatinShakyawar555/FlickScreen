export { removepeople } from '../reducers/PeopleSlice'


import axios from "../../utils/axios";
import { loadpeople } from "../reducers/PeopleSlice";


export const asyncloadpeople = (id) => async (dispatch,getstate) =>{

	try {
		const detail = await axios.get(`/person/${id}`);
		const externalid = await axios.get(`/person/${id}/external_ids`);
		const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
		const tvCredits = await axios.get(`/person/${id}/tv_credits`);
		const movieCredits = await axios.get(`/person/${id}/movie_credits`);
		

		let alldetails = {
			detail : detail.data,
			externalid : externalid.data,
			combinedCredits : combinedCredits.data,
			tvCredits : tvCredits.data,
			movieCredits : movieCredits.data,
		};

		dispatch(loadpeople(alldetails)); 

		// console.log(alldetails);
		
	} catch (error) {
		console.log(error);
		
		
	}

};
