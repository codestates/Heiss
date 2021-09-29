import axios from "axios";

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL";
const HANDLE_REVIEW_MODAL = "HANDLE_REVIEW_MODAL";

// action
export const reviewDatas = () => async (dispatch) => {
	const reviewData = await axios.get(`${process.env.REACT_APP_API_URL}review`);
	dispatch(getReview(reviewData.data.data));
};

export const getReview = (data) => {
	return {
		type: GET_REVIEW,
		payload: data,
	};
};

export const handleReviewModal = () => {
	return {
		type: HANDLE_REVIEW_MODAL,
	};
};

export const handleLoginModal = () => {
	return {
		type: HANDLE_LOGIN_MODAL,
	};
};

// initialState
const initialState = {
	reviewAll: [],
	reviewModal: false,
	loginModal: false,
};

// reducer
export const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEW:
			return {
				...state,
				reviewAll: action.payload,
			};

		case HANDLE_LOGIN_MODAL:
			return {
				...state,
				loginModal: !state.loginModal,
			};

		case HANDLE_REVIEW_MODAL:
			return {
				state,
				reviewModal: !state.reviewModal,
			};

		default:
			return state;
	}
};

export default reviewReducer;
