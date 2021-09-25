import axios from "axios";

// actions type
const REVIEW_DATAS = "REVIEW_DATAS";
const GET_REVIEW = "GET_REVIEW";

// action
export const reviewDatas = () => async (dispatch) => {
	const reviewData = await axios.get(`${process.env.REACT_APP_API_URL}review`);
	dispatch(getReview(reviewData.data.data));
	// return { type: REVIEW_DATAS, payload: reviewData.data };
};

export const getReview = (data) => {
	return {
		type: GET_REVIEW,
		payload: data,
	};
};

// initialState
const initialState = {
	reviewAll: [],
};

// reducer
export const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEW:
			return {
				...state,
				reviewAll: action.payload,
			};
			break;

		default:
			return state;
	}
};

export default reviewReducer;
