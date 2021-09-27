import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_LOGIN = "GET_LOGIN";
const GET_LOGOUT = "GET_LOGOUT";

// action
export const getUserInfo = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
		if (el.data.userInfo) {
			dispatch(getLogin(el.data.userInfo));
		}
	});
};

export const getLogin = (data) => {
	return {
		type: GET_LOGIN,
		payload: data,
	};
};

export const getLogout = () => {
	return {
		type: GET_LOGOUT,
	};
};

// initialState
const initialState = {
	userInfo: {},
	isLogin: false,
};

// reducer
export const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOGIN:
			return { ...state, userInfo: action.payload, isLogin: true };
		case GET_LOGOUT:
			return { ...state, userInfo: {}, isLogin: false };
		default:
			return state;
	}
};

export default users;
