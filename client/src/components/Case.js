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

const Case = ({ canvas, caseInfo, setCaseInfo }) => {
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

	const galaxy21Price = () => {
		setCaseInfo({ ...caseInfo, price: 13000, phoneId: 2 });
	};

	const iphone12Price = () => {
		setCaseInfo({ ...caseInfo, price: 11000, phoneId: 1 });
	};

	return (
		<CaseSection>
			<button
				onClick={() => {
					BackgroundHandler("galaxyS21");
					galaxy21Price();
				}}
			>
				GalaxyS21
			</button>
			<button
				onClick={() => {
					BackgroundHandler("iPhone13");
					iphone12Price();
				}}
			>
				iPhone13
			</button>
		</CaseSection>
	);
};

export default Case;
