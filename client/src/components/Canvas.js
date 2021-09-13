import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import Shapes from "./Shapes";

// 이미지
import favicon from "../img/favicon.ico";
import caseIcon from "../img/case.svg";
import imageIcon from "../img/image.svg";
import shapeIcon from "../img/shape.svg";
import textIcon from "../img/text.svg";

const CanvasSection = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin-top: 3rem;
	position: relative;
`;

const MenuSection = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: #5e5d49;
	width: 130px;
	height: 83.4%;
	right: 0;
	z-index: 1;

	li {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	img {
		height: 3rem;
		margin-bottom: 1rem;
	}

	button {
		background: #707056;
		width: 40px;
		padding: 0.3rem;
		box-sizing: border-box;
		border-radius: 1vh;
		margin-bottom: 3px;
	}

	@media ${(props) => props.theme.tablet} {
		min-width: 80px;
		width: 70px;
		img {
			height: 2rem;
		}
	}
`;

const ListBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #343421;
	/* background: none; */
	width: 50%;
	height: 17rem;
	position: absolute;
	border-radius: 1vh 1vh 0 0;
	margin-top: 3rem;
	bottom: 0;
	z-index: 2;

	@media ${(props) => props.theme.tablet} {
		width: 80%;
	}

	.toggleBtnBox {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 4rem;
	}

	.toggleBtn {
		top: 0;
		margin-top: 3px;
		height: 2.5rem;
	}

	@media ${(props) => props.theme.tablet} {
		height: 11rem;
		.toggleBtnBox {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 1.2rem;
		}
		.toggleBtn {
			top: 0;
			height: 1.5rem;
		}
	}
`;

function Canvas() {
	const [canvasWidth, setCanvasWidth] = useState(document.body.clientWidth);
	const [canvasHeight, setCanvasHeight] = useState(window.innerHeight / 1.2);

	useEffect(() => {
		const canvas = new fabric.Canvas("canvas", {
			// height: canvasHeight,
			height: canvasHeight,
			width: canvasWidth,
			position: "absolute",
			backgroundColor: "white",
			preserveObjectStacking: true, // 맨 위 레이어만 클릭되게함
			stopContextMenu: true, // 우클릭 및 휠클릭 활성
			fireRightClick: true, // 우클릭 및 휠클릭 활성
		});

		const rect = new fabric.Rect({
			left: 100,
			top: 100,
			fill: "red",
			width: 20,
			height: 20,
			angle: 45,
		});

		canvas.add(rect);

		const rect1 = new fabric.Triangle({
			left: 100,
			top: 100,
			fill: "white",
			width: 20,
			height: 20,
			angle: 45,
		});

		canvas.add(rect1);

		// const text = new fabric.Text({
		// 	fontSize: 30,
		// 	originX: "center",
		// 	originY: "center",
		// });

		// canvas.add(text);

		canvas.renderAll(); // useEffect를 통해 전체 랜더링

		const handleResizeEvent = () => {
			setCanvasWidth(document.body.clientWidth);
			setCanvasHeight(window.innerHeight);
		};

		window.addEventListener("resize", handleResizeEvent, false);
		handleResizeEvent();

		return window.removeEventListener("resize", handleResizeEvent);
	}, []);

	return (
		<CanvasSection>
			<>
				<canvas id="canvas" />
				<MenuSection>
					<li>
						<img src={caseIcon} alt="caseIcon" />
						<div>케이스</div>
					</li>
					<li>
						<img src={shapeIcon} alt="shapeIcon" />
						<div>도형</div>
					</li>
					<li>
						<img src={textIcon} alt="textIcon" />
						<div>텍스트</div>
					</li>
					<li>
						<img src={imageIcon} alt="imageIcon" />
						<div>이미지</div>
					</li>
					<button>저장</button>
				</MenuSection>
			</>
			<ListBox>
				<div class="toggleBtnBox">
					<img className="toggleBtn" src={favicon} alt="btn" />
				</div>
				<Shapes />
			</ListBox>
		</CanvasSection>
	);
}

export default Canvas;