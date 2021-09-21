import { createAction } from "redux-actions";
import axios from "axios";
import config from "../../config";

// actions
const REVIEW_DATAS = "review/REVIEW_DATAS";

// action creator function
export const reviewDatas = async () => {
	const datas = await axios.get(`${config.serverUrl}review`);
	return { type: "REVIEW_DATAS", payload: datas };
};

// ThunK

// initialState
const initialState = {
	sample: [
		"https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg",
		"https://cdn.pixabay.com/photo/2020/05/25/20/14/holland-iris-5220407__340.jpg",
		"https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg",
		"https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png",
		"https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg",
		"https://cdn.pixabay.com/photo/2020/08/04/14/42/sky-5463015__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg",
		"https://cdn.pixabay.com/photo/2020/01/09/01/00/the-eye-on-the-greek-4751572__340.png",
		"https://cdn.pixabay.com/photo/2021/01/30/12/19/couple-5963678__340.png",
		"https://cdn.pixabay.com/photo/2021/01/23/07/53/dogs-5941898__340.jpg",
		"https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg",
	],
	reviewAll: [
		"https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg",
	],
};

// reducer
export default function review(state = initialState, action) {
	switch (action.type) {
		case REVIEW_DATAS:
			return {
				...state,
				reviewAll: action.reviewAll,
			};
		default:
			return state;
	}
}
