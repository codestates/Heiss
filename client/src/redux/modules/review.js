import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_REVIEW_WRITE_MODAL = "HANDLE_REVIEW_WRITE_MODAL";
const CANVAS_DATA = "CANVAS_DATA";
const CANVAS_CLEAR = "CANVAS_CLEAR";

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

export const onCanvasData = (data) => {
	return {
		type: CANVAS_DATA,
		payload: data,
	};
};

export const clearJSONDATA = () => {
	return {
		type: CANVAS_CLEAR,
	};
};

// initialState
const initialState = {
	reviewAll: [],
	reviewWriteModal: false,
	canvasdata: "",
	caseInfo: false,
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

		case CANVAS_DATA:
			return {
				...state,
				caseInfo: action.payload,
			};

		case CANVAS_CLEAR:
			return {
				...state,
				caseInfo: false,
			};

		default:
			return state;
	}
};

export default reviewReducer;
