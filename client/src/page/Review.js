import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import config from "../config";

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
	const { sample } = useSelector((state) => ({
		sample: state.review.sample,
	}));

	const dispatch = useDispatch();

	// axios
	axios
		.get(`${config.serverUrl}review`)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});

	return (
		<ReviewSection>
			<Nav reviewBtn={true} />
			<ReviewBox>
				{sample.map((data, key) => (
					<Thumbnail data={data} key={key} shareBtn={true} />
				))}
			</ReviewBox>
		</ReviewSection>
	);
};
export default Review;
