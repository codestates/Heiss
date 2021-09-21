// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createAction } from "redux-actions";

import review from "./modules/review";
// import user from "./modules/user";

// middlewares
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// combineReducers
const appReducer = combineReducers({
	review,
});

const RESET_REDUCER = "root/RESET_REDUCER";

export const resetReducer = createAction(RESET_REDUCER);

const rootReducer = (state, action) => {
	if (action.type === "root/RESET_REDUCER") {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const env = process.env.NODE_ENV;
const middlewares = [thunk.withExtraArgument({ history })];

const enhancer =
	env === "development"
		? composeWithDevTools(applyMiddleware(...middlewares))
		: compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);
export default store;
//커밋
