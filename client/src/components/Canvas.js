import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import axios from "axios";
import Shapes from "./Shapes";
import { flexCenter, color } from "./utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { clearJSONDATA } from "../redux/modules/review";
import {
	handleLoginModal,
	handleAlertModal,
	handleConfirmModal,
} from "../redux/modules/users";

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

const CanvasBox = styled.div`
	${flexCenter}
	width: 100%;
	height: 80%;
	background: #3d3d3d;

	@media ${(props) => props.theme.mobileL} {
		height: 65%;
	}
`;

// 우측 메뉴바
const MenuSection = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: ${color.darkBasic};
	width: 130px;
	height: 80%;
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
		width: 60px;
		img {
			height: 2rem;
		}
	}

	@media ${(props) => props.theme.mobileL} {
		height: 65%;
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
	const user = useSelector((state) => state.user); // 로그인 상태
	const review = useSelector((state) => state.review);
	const [canvas, setCanvas] = useState();
	const [menuNum, setMenuNum] = useState(0); // menu 리스트
	const [context, setContext] = useState(false); // context menu 토글
	const [point, setPoint] = useState({ x: 0, y: 0 });
	const [caseInfo, setCaseInfo] = useState({
		phoneId: 0,
		price: 0,
		setting: '{"a":"a"}',
	});
	const dispatch = useDispatch();

	useEffect(() => {
		const canvasWidth = 600;
		const canvasHeight = 600;

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
				canvas.getPointer(e.e).x + 600,
				canvas.getPointer(e.e).y + 100
			);
			if (e.button === 1) {
				setContext(false);
			}
			if (e.button === 3) {
				// context menu
				setPoint(pointer);
				setContext(true);
			}
		});

		// 캔버스 반응형 이벤트
		const handleResizeEvent = () => {
			if (document.body.clientWidth <= 768) {
				canvas.setDimensions({
					width: 600,
					height: 600,
				});
			}

			if (document.body.clientWidth <= 425) {
				canvas.setDimensions({
					width: 200,
					height: 400,
				});
			}

			canvas.renderAll();
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

		if (review.caseInfo) {
			canvas.loadFromJSON(review.caseInfo.setting);
		}
		canvas.renderAll();

		// useEffect를 통해 전체 랜더링
		return () => {
			window.removeEventListener("resize", handleResizeEvent);
			dispatch(clearJSONDATA());
		};
	}, []);

	// contextMenu handler
	const contextMenuHandler = () => {
		setContext(!context);
	};

	let base64toFile = (base64Img) => {
		let atob = require("atob");
		let bstr = atob(base64Img.split(",")[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		let file = new File([u8arr], "png", { type: "image/png" });
		return file;
	};

	// 저장 핸들러
	const saveHandler = async () => {
		if (user.isLogin) {
			const canvasData = JSON.stringify(canvas);
			const sendData = { ...caseInfo, setting: canvasData };
			const imgdata = canvas.toDataURL("image/png", 1.0);
			let file = base64toFile(imgdata);
			let formdata = new FormData();
			formdata.append("picture", file);

			if (review.caseInfo.id) {
				formdata.append("caseId", review.caseInfo.id);
				formdata.append("phondId", review.caseInfo.phoneId);
				formdata.append("price", review.caseInfo.price);
				formdata.append("setting", canvasData);
			} else {
				for (let el in sendData) {
					formdata.append(el, sendData[el]);
				}
			}

			await axios
				.post(`${process.env.REACT_APP_API_URL}locker`, formdata, {
					withCredentials: true,
					header: { "Content-Type": "multipart/form-data" },
				})
				.then((el) => {
					if (el.data.message === "새로운 저장") {
						dispatch(handleAlertModal("새롭게 저장되었습니다"));
					} else if (el.data.message === "ok") {
						dispatch(
							handleConfirmModal(
								"저장이 완료되었습니다",
								0,
								"보관함으로 이동 하시겠습니까?"
							)
						);
					}
				});
		} else {
			dispatch(handleAlertModal("로그인 해주세요"));
			reverseBoo();
		}
	};

	const patchHandler = async () => {
		const canvasData = JSON.stringify(canvas);
		const imgdata = canvas.toDataURL("image/png", 1.0);
		let file = base64toFile(imgdata);

		let formdata = new FormData();
		formdata.append("picture", file);
		formdata.append("setting", canvasData);

		await axios
			.patch(
				`${process.env.REACT_APP_API_URL}case/${review.caseInfo.id}`,
				formdata,
				{
					withCredentials: true,
					header: { "Content-Type": "multipart/form-data" },
				}
			)
			.then(() => dispatch(handleAlertModal("수정이 완료되었습니다")));
	};

	const reverseBoo = () => {
		dispatch(handleLoginModal());
	};

	return (
		<CanvasSection>
			<CanvasBox>
				<canvas id="canvas" />
			</CanvasBox>
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
				<button onClick={saveHandler}>저장</button>
				{review.caseInfo ? <button onClick={patchHandler}>수정</button> : null}
			</MenuSection>
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
						<Case
							canvas={canvas}
							caseInfo={caseInfo}
							setCaseInfo={setCaseInfo}
						/>,
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
