import React, { useState } from "react";
import styled from "styled-components";

const StrokeSection = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;
		border-radius: 1vh;
		border: 0.7px solid #2f301e;
		background-color: #3d3d3d;
		margin: 1rem;

		@media ${(props) => props.theme.tablet} {
			width: 4rem;
			height: 4rem;
			min-width: 4rem;
			min-height: 4rem;
		}

		img {
			height: 5rem;
			@media ${(props) => props.theme.tablet} {
				min-height: 2rem;
				height: 2rem;
			}
		}

		.circle {
			height: 7rem;
			@media ${(props) => props.theme.tablet} {
				height: 3rem;
			}
		}
	}
`;

const Stroke = ({ canvas }) => {
	const [stroke, setStroke] = useState(0);

	// 선 변경 핸들러
	const handleChangeFont = (e) => {
		e.preventDefault();
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			item.set("stroke", e.target.value);
		});
		setStroke(e.target.value);
		canvas.renderAll();
	};

	return (
		<StrokeSection>
			<button>굵기</button>
			<button>색상</button>
		</StrokeSection>
	);
};

export default Stroke;
