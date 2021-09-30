import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_REVIEW_WRITE_MODAL = "HANDLE_REVIEW_WRITE_MODAL";
const GET_CANVAS = "GET_CANVAS";

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

export const getCanvas = (data) => {
	return {
		type: GET_CANVAS,
		payload: data,
	};
};

// initialState
const initialState = {
	reviewAll: [],
	reviewWriteModal: false,
	canvasdata: "",
};

// reducer
export const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEW:
			return {
				...state,
				reviewAll: action.payload,
			};

		case HANDLE_REVIEW_WRITE_MODAL:
			return {
				...state,
				reviewWriteModal: !state.reviewWriteModal,
			};

		case GET_CANVAS:
			console.log("payload", action.payload);
			return {
				...state,
				canvasdata: action.payload,
			};

		default:
			return state;
	}
};

export default reviewReducer;
