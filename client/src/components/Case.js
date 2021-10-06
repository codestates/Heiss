import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox, phoneList } from "./utils/theme";
import iPhone13White from "./utils/iPhone13White";
import iPhone13Pink from "./utils/iPhone13Pink";
import iPhone13Red from "./utils/iPhone13Red";
import iPhone13Blue from "./utils/iPhone13Blue";
import iPhone13ProBlue from "./utils/iPhone13ProBlue";
import iPhone13ProHolo from "./utils/iPhone13ProHolo";
import iPhone13ProGold from "./utils/iPhone13ProGold";
import galaxy21White from "./utils/galaxy21White";
import galaxy21Purple from "./utils/galaxy21Purple";
import galaxy21Pink from "./utils/galaxy21Pink";

const CaseSection = styled.div`
	${phoneList}
	text-align: center;

	@media ${(props) => props.theme.tablet} {
	}
`;

const Case = ({ canvas, caseInfo, setCaseInfo }) => {
	// img object
	const bgImg = {
		iPhone13White,
		iPhone13Pink,
		iPhone13Red,
		iPhone13Blue,
		iPhone13ProBlue,
		iPhone13ProHolo,
		iPhone13ProGold,
		galaxy21White,
		galaxy21Purple,
		galaxy21Pink,
	};

	// 배경 이미지 핸들러
	const BackgroundHandler = (name) => {
		new fabric.Image.fromURL(bgImg[name], (img) => {
			img.crossOrigin = "Anonymous";
			if (document.body.clientWidth > 425) {
				img.set({
					opacity: 1,
					left: canvas.width / 3.5,
					top: canvas.height / 14,
					scaleY: 1,
					scaleX: 1,
				});
			}
			if (document.body.clientWidth < 425) {
				img.set({
					opacity: 1,
					left: canvas.width / 3.5,
					top: canvas.height / 8,
					scaleY: 0.7,
					scaleX: 0.7,
				});
			}
			canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas));
		});
		canvas.renderAll();
	};

	const iphone13Price = () => {
		setCaseInfo({ ...caseInfo, price: 17000, phoneId: 1 });
	};

	const iphone13ProPrice = () => {
		setCaseInfo({ ...caseInfo, price: 22000, phoneId: 2 });
	};

	const galaxy21Price = () => {
		setCaseInfo({ ...caseInfo, price: 15000, phoneId: 3 });
	};

	return (
		<CaseSection>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13White");
					iphone13Price();
				}}
			>
				<p className="p-title">iPhone13</p>
				<p>White</p>
				<p>₩17000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13Pink");
					iphone13Price();
				}}
			>
				<p>iPhone13</p>
				<p>Pink</p>
				<p>₩17000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13Red");
					iphone13Price();
				}}
			>
				<p>iPhone13</p>
				<p>Red</p>
				<p>₩17000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13Blue");
					iphone13Price();
				}}
			>
				<p>iPhone13</p>
				<p>Blue</p>
				<p>₩17000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13ProHolo");
					iphone13ProPrice();
				}}
			>
				<p>iPhone13</p>
				<p className="pro">pro</p>
				<p className="style">Hologram</p>
				<p className="price">₩22000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13ProBlue");
					iphone13ProPrice();
				}}
			>
				<p>iPhone13</p>
				<p className="pro">pro</p>
				<p className="style">Sierra Blue</p>
				<p className="price">₩22000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("iPhone13ProGold");
					iphone13Price();
				}}
			>
				<p>iPhone13</p>
				<p className="pro">pro</p>
				<p className="style">Gold</p>
				<p className="price">₩22000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("galaxy21White");
					galaxy21Price();
				}}
			>
				<p>galaxy21</p>
				<p>White</p>
				<p>₩15000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("galaxy21Purple");
					galaxy21Price();
				}}
			>
				<p>galaxy21</p>
				<p>purple</p>
				<p>₩15000</p>
			</div>
			<div
				onClick={() => {
					BackgroundHandler("galaxy21Pink");
					galaxy21Price();
				}}
			>
				<p>galaxy21</p>
				<p>Pink</p>
				<p>₩15000</p>
			</div>
		</CaseSection>
	);
};

export default Case;
