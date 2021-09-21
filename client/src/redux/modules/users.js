import { createAction, handleActions } from "redux-actions";

const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SIGNUP = "user/SIGNUP";

// const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
// const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const singup = createAction(SIGNUP, (userInfo) => ({ userInfo }));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));

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

const user = handleActions(
	{
		[LOGIN]: (state, action) => ({
			...state,
			user: {
				...state.user,
				isLogin: true,
				error: null,
			},
		}),
		[LOGOUT]: (state, action) => ({
			...state,
			user: {
				...state.user,
				isLogin: false,
				error: action.error,
			},
		}),
		[SIGNUP]: (state, action) => ({
			...state,
			signuUp: {
				...state.signUp,
			},
		}),
	},
	initialState
);

export default users;

//커밋
