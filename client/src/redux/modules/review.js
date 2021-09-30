import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_REVIEW_WRITE_MODAL = "HANDLE_REVIEW_WRITE_MODAL";

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

export const handleRevieWritewModal = () => {
	return {
		type: HANDLE_REVIEW_WRITE_MODAL,
	};
};

// initialState
const initialState = {
	reviewAll: [],
	reviewWriteModal: false,
	reviewModal: false,
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

		case HANDLE_REVIEW_WRITE_MODAL:
			return {
				...state,
				reviewWriteModal: !state.reviewWriteModal,
			};
			break;

		default:
			return state;
	}
};

export default reviewReducer;
