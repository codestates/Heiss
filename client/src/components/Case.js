import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox } from "./utils/theme";
import S21perple from "./utils/galaxy21Purple";
import I12BLACK from "./utils/iPhone12Black";
const CaseSection = styled.div`
	${listBox}
	justify-content: center;
`;

let galaxyS21 = S21perple;

let iPhone13 = I12BLACK;

const Case = ({ canvas }) => {
	// img object
	const bgImg = {
		galaxyS21,
		iPhone13,
	};

	// 배경 이미지 핸들러

	const BackgroundHandler = (name) => {
		new fabric.Image.fromURL(bgImg[name], (img) => {
			img.crossOrigin = "Anonymous";
			console.log(img);
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
			<button onClick={() => BackgroundHandler("galaxyS21")}>GalaxyS21</button>
			<button onClick={() => BackgroundHandler("iPhone13")}>iPhone13</button>
		</CaseSection>
	);
};

export default Case;
