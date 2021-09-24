import React, { useState } from "react";
import styled from "styled-components";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import logo from "../img/heiss.svg";
import { Link } from "react-router-dom";

const SignSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: 100%;

	img {
		height: 6rem;

		@media ${(props) => props.theme.mobileL} {
			height: 4rem;
		}
	}

	@media ${(props) => props.theme.mobileL} {
		padding: 0.4rem;
	}
`;

const BtnSection = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
	width: 60%;

	@media ${(props) => props.theme.tablet} {
		width: 80%;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 100%;
	}

	button {
		width: 100%;
		min-width: 5.5rem;
		padding: 5px;
		font-size: 2.4rem;
		color: gray;
		border: none;

		@media ${(props) => props.theme.mobileL} {
			font-size: 0.8rem;
		}

		@media ${(props) => props.theme.table} {
			font-size: 1.3rem;
		}
	}
	.signinBtn {
		background: #f47676;
		color: #f5f5f3;
	}
	.signupBtn {
		background: #ffffe7;
		color: black;
	}
`;

const InputSection = styled.div`
	display: flex;
	width: 60%;

	@media ${(props) => props.theme.tablet} {
		width: 80%;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 100%;
	}
`;

const Sign = ({ reverseBoo }) => {
	const [shadower, setShadower] = useState(true);

	return (
		<SignSection>
			<Link to="/" onClick={() => reverseBoo()}>
				<img src={logo} alt="logo" />
			</Link>
			<BtnSection>
				<button
					className={shadower && "signinBtn"}
					onClick={() => setShadower(!shadower)}
				>
					로그인
				</button>
				<button
					className={!shadower && "signupBtn"}
					onClick={() => setShadower(!shadower)}
				>
					회원가입
				</button>
			</BtnSection>
			<InputSection>{shadower ? <Signin /> : <Signup />}</InputSection>
		</SignSection>
	);
};

export default Sign;
