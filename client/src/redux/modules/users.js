import { createAction, handleActions } from "redux-actions";

const LOGIN = "user/LOGIN";
const LOGING = "user/LOGING";
const LOGOUT = "user/LOGOUT";

const login = createAction(LOGIN, (userInfo) => ({ userInfo }));

const loging = createAction(LOGING, (isLogin, user, tutorial) => ({
	isLogin,
	...user,
}));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));

const initialState = {
	isLogin: false,
	user: {
		email: null,
		nickname: null,
		userId: null,
	},
};

const user = handleActions({
	[LOGIN]: (state, action) =>
		produce(state, (el) => {
			el.isLogin = true;
		}),
	[LOGOUT]: (state, action) =>
		produce(state, (el) => {
			el.isLogin = false;
			el.user.email = null;
			el.user.nickname = null;
			el.user.userId = null;
		}),
});
export default users;
