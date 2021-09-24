import { request } from "../../components/utils/axios";

// const LOGIN = "user/LOGIN";
// const LOGOUT = "user/LOGOUT";
// const SIGNUP = "user/SIGNUP";
const REGISTER_USER = "REGISTER_USER";

const USER_URL = "/api/user";

export const registerUser = (dataToSubmit) => {
	const data = request("post", USER_URL + "/register", dataToSubmit);
	return {
		type: REGISTER_USER,
		payload: data,
	};
};

export const users = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, loginSuccess: action.payload };
		default:
			return state;
	}
};

// const initialState = {
// 	user: {
// 		isLogin: false,
// 		error: null,
// 	},
// 	signUp: {
// 		email: false,
// 		nickname: false,
// 		userId: false,
// 	},
// 	logout: {
// 		email: null,
// 		username: null,
// 	},
// };

// export const users = handleActions(
// 	{
// 		[LOGIN]: (state, action) => ({
// 			...state,
// 			user: {
// 				...state.user,
// 				isLogin: true,
// 				error: null,
// 			},
// 		}),
// 		[LOGOUT]: (state, action) => ({
// 			...state,
// 			user: {
// 				...state.user,
// 				isLogin: false,
// 				error: action.error,
// 			},
// 		}),
// 		[SIGNUP]: (state, action) => ({
// 			...state,
// 			signuUp: {
// 				...state.signUp,
// 			},
// 		}),
// 	},
// 	initialState
// );

export default users;
