import axios from "axios";

const DOMAIN = "http://localhost:80/";
// const DOMAIN = `${process.env.REACT_APP_API_URL}`;
console.log(DOMAIN);
axios.defaults.withCredentials = true;
export const request = (method, url, data) => {
	return axios({
		method,
		url: DOMAIN + url,
		data,
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
