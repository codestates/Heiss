import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { reviewDatas } from "../redux/modules/review";

import Nav from "./Nav";
import Thumbnail from "../components/Thumbnail";

const ReviewSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
`;

const ReviewBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Review = () => {
	const review = useSelector((state) => state.review.reviewAll);

	return (
		<ReviewSection>
			<Nav reviewBtn={true} />
			<ReviewBox>
				{review.map((data, index) => (
					<Thumbnail key={index} data={data} shareBtn={true} />
				))}
			</ReviewBox>
		</ReviewSection>
	);
};
export default Review;
