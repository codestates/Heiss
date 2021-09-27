import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox } from "./utils/theme";

const CaseSection = styled.div`
	${listBox}
	justify-content: center;
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
				opacity: 1,
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
