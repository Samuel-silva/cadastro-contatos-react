import axios from 'axios';

const baseURL = "https://contacts-ab0e8-default-rtdb.firebaseio.com/"

const api = axios.create({
	baseURL,
})

export default api;
