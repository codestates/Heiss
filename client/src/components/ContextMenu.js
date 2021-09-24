import React from "react";
import styled from "styled-components";

const ContextMenuSection = styled.ul`
	display: flex;
	width: 100%;
	height: 100%;
	z-index: 1;
	background-color: black;
`;

const ContextMenu = () => {
	return (
		<ContextMenuSection>
			<li>앞으로 보내기</li>
			<li>뒤로 보내기</li>
			<li>삭제</li>
		</ContextMenuSection>
	);
};

export default ContextMenu;
