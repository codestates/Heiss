import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_LOGIN = "GET_LOGIN";
const GET_LOGOUT = "GET_LOGOUT";
const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL";
const HANDLE_ALERT_MODAL = "HANDLE_ALERT_MODAL";
const HANDLE_CONFIRM_MODAL = "HANDLE_CONFIRM_MODAL";
const GET_LOCKER = "GET_LOCKER";
const GET_CART = "GET_CART";
const GET_ORDER = "GET_ORDER";

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

export const getUserOrder = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}order`).then((el) => {
		if (el.data) {
			dispatch(getorder(el.data));
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

export const getUserCart = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}cart`).then((el) => {
		if (el.data.data) {
			dispatch(getcart(el.data.data));
		}
	});
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

export const getorder = (data) => {
	return {
		type: GET_ORDER,
		payload: data,
	};
};

export const getcart = (data) => {
	return {
		type: GET_CART,
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

export const handleAlertModal = (text) => {
	return {
		type: HANDLE_ALERT_MODAL,
		text: text,
	};
};

export const handleConfirmModal = (text, id, text_2) => {
	return {
		type: HANDLE_CONFIRM_MODAL,
		text,
		id,
		text_2,
	};
};

// initialState
const initialState = {
	userInfo: {},
	isLogin: false,
	loginModal: false,
	alertModal: false,
	alertText: "",
	confirmModal: false,
	confirmText: "",
	confirmText_2: "",
	id: 0,
	userCart: [],
	userOrder: [],
	userlocker: [],
};

// reducer
export const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOGIN:
			return { ...state, userInfo: action.payload, isLogin: true };

		case GET_LOGOUT:
			return { ...state, userInfo: {}, isLogin: false };

		case GET_LOCKER:
			return { ...state, userlocker: action.payload };

		case GET_ORDER:
			return { ...state, userOrder: action.payload };

		case GET_CART:
			return { ...state, userCart: action.payload };

		case HANDLE_LOGIN_MODAL:
			return {
				...state,
				loginModal: !state.loginModal,
			};

		case HANDLE_ALERT_MODAL:
			return {
				...state,
				alertModal: !state.alertModal,
				alertText: action.text,
			};

		case HANDLE_CONFIRM_MODAL:
			return {
				...state,
				confirmModal: !state.confirmModal,
				confirmText: action.text,
				confirmText_2: action.text_2,
				id: action.id,
			};

		default:
			return state;
	}
};

export default users;
