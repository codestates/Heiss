import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import logo from "../img/heiss.svg";
import Sign from "../modal/Sign";

import profile from "../img/profile.png";

const NavSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	height: 4vh;
	/* background: #c3c4ad; */
	background: none;
	padding: 1rem;
	#heissLogo {
		height: 30px;
		margin-left: 10px;
	}
	button {
		color: #f6f7df;
		font-size: 1rem;
	}

	.navBarState {
		color: black;
	}
`;

const signModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 2,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		border: "1px solid #0f0d00",
		background: "#0f0d00",
		margin: "0 auto",
		overflow: "auto",
		width: "80vw",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const ProfileBox = styled.div`
	display: flex;

	.profileBox {
		background: #3d3d3d;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
	}

	img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
		margin-right: 0.5rem;
	}
`;

const Nav = () => {
	const [boo, setBoo] = useState(false);
	const [login, setLogin] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};

	return (
		<NavSection>
			<Modal
				isOpen={boo}
				style={signModal}
				onRequestClose={() => reverseBoo()}
				ariaHideApp={false}
			>
				<Sign reverseBoo={reverseBoo} />
			</Modal>

			<Link to="/">
				<img id="heissLogo" src={logo} alt="heiss" />
			</Link>
			{login ? (
				<button onClick={reverseBoo}>LOGIN</button>
			) : (
				<ProfileBox>
					<Link className="profileBox" to="/mypage">
						<img src={profile} alt="profile" />
					</Link>
					<button onClick={() => setLogin(!login)}>LOGOUT</button>
				</ProfileBox>
			)}
		</NavSection>
	);
};

export default Nav;
