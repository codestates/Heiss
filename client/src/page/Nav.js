import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../img/heiss.png";

const NavSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	height: 8vh;
	/* background: #c3c4ad; */
	background: none;
	padding: 1rem;
	#heissLogo {
		height: 30px;
		margin-left: 10px;
	}

	button {
		color: #f6f7df;
	}
`;

const Nav = () => {
	return (
		<NavSection>
			<Link to="/">
				<img id="heissLogo" src={logo} alt="heiss" />
			</Link>
			<button>Login</button>
		</NavSection>
	);
};

export default Nav;
