import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";

// image
import { galaxyS21 } from "../img/galaxyS21.png";

const CaseSection = styled.div`
	display: flex;
	/* flex-direction: column; */
	justify-content: center;
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
		color: #f47676;
		font-size: 1.4rem;
		font-weight: bold;

		@media ${(props) => props.theme.tablet} {
			width: 4rem;
			height: 4rem;
			min-width: 4rem;
			min-height: 4rem;
			font-size: 1rem;
		}

		img {
			height: 5rem;
			@media ${(props) => props.theme.tablet} {
				min-height: 2rem;
				height: 2rem;
			}
		}
	}
`;

const Case = ({ canvas }) => {
	// img object
	const bgImg = {
		GalaxyS21:
			"https://cdn.discordapp.com/attachments/884357003747688478/890777202369638460/2021-09-24_10.50.28.png",

		iPhone13:
			"https://cdn.discordapp.com/attachments/884357003747688478/890774776128344104/unknown.png",
	};

	// 배경 이미지 핸들러
	const BackgroundHandler = (e) => {
		fabric.Image.fromURL(bgImg[e.target.textContent], (img) => {
			img.set({
				opacity: 0.6,
				left: canvas.width / 2.5,
				top: canvas.height / 5,
				scaleY: 1.3,
				scaleX: 1.3,
			});
			canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas));
		});

		canvas.renderAll();
	};

	return (
		<CaseSection>
			<button onClick={BackgroundHandler}>GalaxyS21</button>
			<button onClick={BackgroundHandler}>iPhone13</button>
		</CaseSection>
	);
};

export default Case;
