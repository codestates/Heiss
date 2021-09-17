import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

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
	const { sample, reviewAll } = useSelector((state) => ({
		sample: state.review.sample,
		reviewAll: state.review.reviewAll,
	}));

	return (
		<ReviewSection>
			<Nav reviewBtn={true} />
			<ReviewBox>
				{reviewAll.map((data, key) => (
					<Thumbnail data={data} key={key} shareBtn={true} />
				))}
			</ReviewBox>
		</ReviewSection>
	);
};
export default Review;
