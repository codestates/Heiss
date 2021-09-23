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
			"https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/36720533844755-feb3c8f3-ae0e-41b0-b16c-238a25b79d1e.jpg",

		iPhone13:
			"https://cdn.discordapp.com/attachments/884332802076717097/890524478491209748/9k.png",
	};

	// 배경 이미지 핸들러
	const BackgroundHandler = (e) => {
		fabric.Image.fromURL(bgImg[e.target.textContent], (img) => {
			img.set({
				opacity: 0.9,
				left: canvas.width / 3,
				top: canvas.height / 5,
				// scaleX: canvas.width / img.width / 2,
				// scaleY: canvas.height / img.height / 2,
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
