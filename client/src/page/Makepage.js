import React from "react";
import styled from "styled-components";
import Canvas from "../components/Canvas";
import Nav from "./Nav";

const MakepageSection = styled.ul`
	display: flex;
	flex-direction: column;
	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
	}
`;

const Makepage = () => {
	return (
		<MakepageSection>
			<Nav />
			<li>
				<Canvas />
			</li>
			<li>
				<div style={{ width: "100%", height: "100%" }}>review</div>
			</li>
		</MakepageSection>
	);
};

export default Makepage;
