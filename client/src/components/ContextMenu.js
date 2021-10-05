import React, { useEffect } from "react";
import styled from "styled-components";

const ContextMenuSection = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 180px;
	height: 80px;
	z-index: 1;
	position: absolute;

	background-color: white;
	border: 0.2px solid #cccccc;
	border-radius: 2vh;
	cursor: pointer;
`;

const ContextMenu = ({ point, canvas, contextMenuHandler }) => {
	useEffect(() => {
		// 좌표값 기준으로 context menu가 나타나게 함
		const menuSection = document.getElementsByClassName("menuSection")[0];
		menuSection.setAttribute("style", `top: ${point.y}px; left: ${point.x}px`);
	});

	const sendFrontObject = () => {
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			canvas.bringForward(item);
		});
		contextMenuHandler();
		canvas.renderAll();
	};

	const sendBackObject = () => {
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			canvas.sendBackwards(item);
		});
		contextMenuHandler();
		canvas.renderAll();
	};

	const deleteBtn = () => {
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			canvas.remove(item);
		});
		contextMenuHandler();
		canvas.renderAll();
	};

	return (
		<ContextMenuSection className="menuSection">
			<li onClick={sendFrontObject}>앞으로 보내기</li>
			<li onClick={sendBackObject}>뒤로 보내기</li>
			<li onClick={deleteBtn}>삭제</li>
		</ContextMenuSection>
	);
};

export default ContextMenu;
