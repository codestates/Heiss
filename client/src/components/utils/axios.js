import axios from "axios";

const DOMAIN = "https://api.heiss.shop/";
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
