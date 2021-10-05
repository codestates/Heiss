import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, color } from "../components/utils/theme";

// 이미지
import loadingIcon from "../img/loading.svg";

const LoadingSection = styled.div`
	${flexCenter}

	width: 100vw;
	height: 100vh;
	flex-direction: column;
	background: ${color.basic};

	img {
		margin-bottom: 5rem;

		animation: rotate 2s linear infinite;
		transform-origin: 50% 50%;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	h3 {
		color: ${color.white};
	}
`;

const Loading = () => {
	return (
		<LoadingSection>
			<img src={loadingIcon} alt="Loading" />
			<h3>Loading....</h3>
		</LoadingSection>
	);
};

export default Loading;
