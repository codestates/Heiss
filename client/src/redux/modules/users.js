import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_LOGIN = "GET_LOGIN";
const GET_LOGOUT = "GET_LOGOUT";
const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL";
const GET_LOCKER = "GET_LOCKER";
const PATCH_USER_INFO = "PATCH_USER_INFO";
const DELETE_USER = "DELETE_USER";

// action
export const getUserInfo = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
		if (el.data.userInfo) {
			dispatch(getLogin(el.data.userInfo));
		}
	});
};

export const newUserInfo = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}user/mypage`).then((el) => {
		if (el.data.userInfo) {
			dispatch(getLogin(el.data.userInfo));
		}
	});
};

export const getUserLocker = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}locker`).then((el) => {
		if (el.data.data) {
			dispatch(getLocker(el.data.data));
		}
	});
};
export const deleteUserInfo = () => {
	const data = axios
		.delete(`${process.env.REACT_APP_API_URL}user`)
		.then((res) => res.data.message);
};

export const getLogin = (data) => {
	return {
		type: GET_LOGIN,
		payload: data,
	};
};

export const getLocker = (data) => {
	return {
		type: GET_LOCKER,
		payload: data,
	};
};

export const getLogout = () => {
	return {
		type: GET_LOGOUT,
	};
};

export const handleLoginModal = () => {
	return {
		type: HANDLE_LOGIN_MODAL,
	};
};

export const patchUserInfo = () => {
	return {
		type: PATCH_USER_INFO,
	};
};

export const deleteUser = (data) => {
	return {
		type: DELETE_USER,
		payload: data,
	};
};

// initialState
const initialState = {
	userInfo: {},
	isLogin: false,
	loginModal: false,
};

// reducer
export const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOGIN:
			return { ...state, userInfo: action.payload, isLogin: true };
			break;

		case GET_LOGOUT:
			return { ...state, userInfo: {}, isLogin: false };
			break;

		case GET_LOCKER:
			return { ...state, userlocker: action.payload };
			break;

		case HANDLE_LOGIN_MODAL:
			return {
				...state,
				loginModal: !state.loginModal,
			};
		case DELETE_USER:
			return (state = {});
			break;

		default:
			return state;
	}
};

export default users;
