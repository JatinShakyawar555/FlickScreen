import axios from "axios";



const instance = axios.create({
	// BASE URL MEANS DOMAIN URL , ITS SAME FOR EVERYONE like default
	baseURL: "https://api.themoviedb.org/3",
	// IN HEADER WE PASS TOKEN , IN THIS WE PASS A VALID KEY
	headers: {
		accept: 'application/json',
		Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjE3NmY5NmQ0ZjE4MGYyMzIyNzdmOTM3YWQ1OGQ0YSIsIm5iZiI6MTczMDkwMjA1Mi43MzQ1MTEsInN1YiI6IjY3MmEyNTUxMjZiNjA1YmMxOWU1NzkwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.THfDxL3YkhL8iDoUPaKBd68-f7uXJQkryxeXpqjiaVY",
	},
})




export default instance;