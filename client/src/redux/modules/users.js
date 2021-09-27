import { request } from "../../components/utils/axios";

const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const USER_URL = "user";

export const registerUser = (user) => {
	const data = request("post", USER_URL + "/signup", user);
	return {
		type: REGISTER_USER,
		payload: data,
	};
};

export const loginUser = (user) => {
	const data = request("post", USER_URL + "/signin", user);
	return {
		type: LOGIN_USER,
		payload: data,
	};
};

const initialState = {
	user: {
		isLogin: false,
		error: null,
	},
	signUp: {
		email: false,
		nickname: false,
		userId: false,
	},
	logout: {
		email: null,
		username: null,
	},
};

export const users = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, signUp: action.payload };
		case LOGIN_USER:
			return { ...state, isLogin: true, error: null };
		default:
			return state;
	}
};
export default users;
