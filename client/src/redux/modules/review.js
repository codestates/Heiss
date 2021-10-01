import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_REVIEW_WRITE_MODAL = "HANDLE_REVIEW_WRITE_MODAL";
const CANVAS_JSON = "CANVAS_JSON";
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

export const onJSONDATA = (data, id) => {
	return {
		type: CANVAS_JSON,
		payload: { data, id },
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
	jsonData: false,
	caseinfo: [],
	caseId: false,
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

		case CANVAS_JSON:
			return {
				...state,
				jsonData: action.payload.data,
				caseId: action.payload.id,
			};

		case CANVAS_CLEAR:
			return {
				...state,
				jsonData: false,
				caseId: false,
			};

		default:
			return state;
	}
};

export default reviewReducer;
