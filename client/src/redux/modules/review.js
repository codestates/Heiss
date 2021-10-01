import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_REVIEW = "GET_REVIEW";
const HANDLE_REVIEW_WRITE_MODAL = "HANDLE_REVIEW_WRITE_MODAL";
const GET_CANVAS = "GET_CANVAS";
const CANVAS_DESERIALIZATION = "CANVAS_DESERIALIZATION";
const CANVAS_JSON = "CANVAS_JSON";

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

export const onDes = (data, id) => {
	return {
		type: CANVAS_DESERIALIZATION,
		payload: { data, id },
	};
};

export const onJSONDATA = (data) => {
	return {
		type: CANVAS_JSON,
		payload: data,
	};
};

// initialState
const initialState = {
	reviewAll: [],
	reviewWriteModal: false,
	canvasdata: "",
	jsonData: "",
	caseId: 0,
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
			return {
				...state,
				canvasdata: action.payload,
			};

		case CANVAS_DESERIALIZATION:
			const canvas = state.canvasdata;
			console.log("reducer", canvas, action.payload);

			return {
				...state,
				caseId: action.payload.id,
				canvasdata: canvas.action.payload,
			};

		default:
			return state;
	}
};

export default reviewReducer;
