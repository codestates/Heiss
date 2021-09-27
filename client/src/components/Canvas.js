import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Shapes from "./Shapes";
import { color } from "./utils/theme";

// 이미지
// import favicon from "../img/favicon.ico";
import caseIcon from "../img/case.svg";
import imageIcon from "../img/image.svg";
import shapeIcon from "../img/shape.svg";
import textIcon from "../img/text.svg";
import palleteIcon from "../img/pallete.svg";
import Text from "./Text";
import Case from "./Case";
import Colorpickers from "./Colorpickers";
import ContextMenu from "./ContextMenu";
import Image from "./Image";

// 캔버스 전체 영역
const CanvasSection = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin-top: 3rem;
	position: relative;
`;

// 우측 메뉴바
const MenuSection = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: ${color.darkBasic};
	width: 130px;
	height: 83.4%;
	right: 0;
	z-index: 1;
	color: ${color.white};

	li {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		cursor: pointer;
	}

	img {
		height: 3rem;
		margin-bottom: 1rem;
	}

	button {
		background: ${color.basic};
		width: 40px;
		padding: 0.3rem;
		box-sizing: border-box;
		border-radius: 1vh;
		margin-bottom: 3px;
		color: ${color.white};
	}

	@media ${(props) => props.theme.tablet} {
		min-width: 80px;
		width: 70px;
		img {
			height: 2rem;
		}
	}
`;

// 하단 리스트
const ListBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${color.darkBasic};
	width: 50%;
	height: 240px;
	position: absolute;
	border-radius: 2vh 2vh 0 0;
	margin-top: 3rem;
	bottom: 0;
	z-index: 2;

	@media ${(props) => props.theme.tablet} {
		width: 80%;
	}
`;

const Canvas = () => {
	const [canvasWidth, setCanvasWidth] = useState(document.body.clientWidth);
	const [canvasHeight, setCanvasHeight] = useState(window.innerHeight / 1.2);
	const [canvas, setCanvas] = useState();
	const [menuNum, setMenuNum] = useState(0); // menu 리스트
	const [context, setContext] = useState(false); // context menu 토글
	const [point, setPoint] = useState({ x: 0, y: 0 });

	const [img, setImg] = useState("");

	useEffect(() => {
		const canvas = new fabric.Canvas("canvas", {
			crossOrigin: "anonymous",
			height: canvasHeight,
			width: canvasWidth,
			position: "absolute",
			backgroundColor: "white",
			preserveObjectStacking: true, // 맨 위 레이어만 클릭되게함
			stopContextMenu: true, // 우클릭 및 휠클릭 활성
			fireRightClick: true, // 우클릭 및 휠클릭 활성
			fireMiddleClick: true, // 미들클릭 활성
			allowTaint: true,
			foreignObjectRendering: true,
		});
		setCanvas(canvas);

		// 마우스 클릭 이벤트
		canvas.on("mouse:down", (e) => {
			const pointer = new fabric.Point(
				canvas.getPointer(e.e).x,
				canvas.getPointer(e.e).y
			);

			if (e.button === 1) {
				setContext(false);
			}
			if (e.button === 3) {
				// context menu
				setContext(true);
				setPoint(pointer);
			}
		});

		// 캔버스 반응형 이벤트
		const handleResizeEvent = () => {
			setCanvasWidth(document.body.clientWidth);
			setCanvasHeight(window.innerHeight);
		};

		// 삭제 버튼
		const deleteBtn = (e) => {
			if (e.keyCode === 46) {
				const items = canvas.getActiveObjects();
				items.forEach((item) => {
					canvas.remove(item);
				});
			}
		};

		window.addEventListener("keydown", deleteBtn);
		window.addEventListener("resize", handleResizeEvent, false);
		handleResizeEvent();

		canvas.renderAll(); // useEffect를 통해 전체 랜더링

		return window.removeEventListener("resize", handleResizeEvent);
	}, []);

	// contextMenu handler
	const contextMenuHandler = () => {
		setContext(!context);
	};

	// 저장 핸들러
	const saveHandler = async () => {
		const imgdata = canvas.toDataURL("image/png", 1.0);
		console.log(imgdata);
		setImg(imgdata);
		await axios
			.post(
				`${process.env.REACT_APP_API_URL}locker`,
				{
					userId: 2,
					phone: 1,
					price: 1000,
					img: imgdata,
					setting: "갤럭시",
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => console.log(res));
	};

	return (
		<CanvasSection>
			<>
				<canvas id="canvas" />
				<MenuSection>
					<li onClick={() => setMenuNum(0)}>
						<img src={caseIcon} alt="caseIcon" />
						<div>케이스</div>
					</li>
					<li onClick={() => setMenuNum(1)}>
						<img src={shapeIcon} alt="shapeIcon" />
						<div>도형</div>
					</li>
					<li onClick={() => setMenuNum(2)}>
						<img src={textIcon} alt="textIcon" />
						<div>텍스트</div>
					</li>
					<li onClick={() => setMenuNum(3)}>
						<img src={imageIcon} alt="imageIcon" />
						<div>이미지</div>
					</li>
					<li onClick={() => setMenuNum(4)}>
						<img src={palleteIcon} alt="palleteIcon" />
						<div>색상</div>
					</li>
					<img src={img}></img>
					{/* <Link to="mypage"> */}
					<button onClick={saveHandler}>저장</button>
					{/* </Link> */}
				</MenuSection>
			</>
			{context && (
				<ContextMenu
					point={point}
					canvas={canvas}
					contextMenuHandler={contextMenuHandler}
				/>
			)}
			<ListBox>
				{/* <div class="toggleBtnBox">
					<img className="toggleBtn" src={favicon} alt="btn" />
				</div> */}
				{
					[
						<Case canvas={canvas} />,
						<Shapes canvas={canvas} />,
						<Text canvas={canvas} />,
						<Image canvas={canvas} />,
						<Colorpickers canvas={canvas} />,
					][menuNum]
				}
			</ListBox>
		</CanvasSection>
	);
};

export default Canvas;
