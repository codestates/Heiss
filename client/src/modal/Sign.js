import React, { useState } from "react";
import styled from "styled-components";
import Singup from "../components/Signup";
import Signin from "../components/Singin";
import logo from "../img/heiss.svg";
import { Link } from "react-router-dom";

const SignSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 3rem;
	img {
		height: 6rem;

		@media ${(props) => props.theme.mobileL} {
			height: 4rem;
		}
	}
`;

const BtnSection = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
	button {
		width: 100%;
		padding: 5px;
		font-size: 2.4rem;
		color: gray;

		@media ${(props) => props.theme.mobileL} {
			font-size: 1rem;
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
	flex-direction: column;
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
			<InputSection>{shadower ? <Signin /> : <Singup />}</InputSection>
		</SignSection>
	);
};

export default Sign;
