import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info : null,
}

export const PeopleSlice = createSlice({
	name: 'person',
	initialState,
	reducers: {

		loadpeople : (state,action)=>{
			state.info = action.payload; 
		},

		removepeople : (state,action)=>{
			state.info = null; 
		},


	  
	},
  })
  
  // Action creators are generated for each case reducer function
  export const {loadpeople, removepeople} = PeopleSlice.actions
  
  export default PeopleSlice.reducer