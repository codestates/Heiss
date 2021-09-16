import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "../img/카카오.png";
import naver from "../img/네이버.png";
import loginSVG from "../img/login.png";
import config from "../config";

const SigninSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 30vh;
	width: 40vw;
	border: 3px solid #f47676;
	padding: 3rem;
	margin: 0;
	@media ${(props) => props.theme.mobileL} {
		width: 6rem;
	}

	input {
		margin-top: 1rem;
		width: 30vw;
		margin-bottom: 20px;
		height: 30px;
		border: 2px solid #f47676;
		border-radius: 1vh;
		@media ${(props) => props.theme.mobileL} {
			width: 9rem;
			font-size: 0.5rem;
			&:first-child {
				margin-top: 3rem;
			}
			&::placeholder {
				font-size: 0.5rem;
			}
		}
	}
	.warring {
		margin-bottom: 3rem;
		color: #ff5b4f;

		@media ${(props) => props.theme.mobileL} {
			margin-bottom: 1rem;
			font-size: 0.3rem;
		}
	}
	button {
		color: #f5f5f3;
		font-weight: bold;
		font-size: 18px;
		border: 3px solid #ffffe7;
		border-radius: 1.4vh;
		padding: 0.4rem;
		margin: 0.7rem;
		width: 7rem;
		min-height: 20px;

		@media ${(props) => props.theme.mobileL} {
			width: 10rem;
			height: 3rem;
			font-size: 0.3rem;
		}

		@media ${(props) => props.theme.table} {
			font-size: 11px;
		}
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 2rem;

	@media ${(props) => props.theme.mobileL} {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 3rem;
	}

	.kakao {
		border: 3px solid #ffe10c;
		background: #ffe10c;
	}
	.naver {
		border: 3px solid #00c300;
		background: #00c300;
	}
	.loginBtn {
		background: #ffffe7;
	}
	.desktopBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		img {
			height: 2rem;
			margin-right: 0.4rem;
			@media ${(props) => props.theme.table} {
				height: 1rem;
			}
		}
		@media ${(props) => props.theme.mobileL} {
			display: none;
		}
	}
	.mobileBtn {
		display: none;
		margin: 3px;
		@media ${(props) => props.theme.mobileL} {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
			width: 90%;
			height: 1.5rem;

			img {
				height: 1rem;
				padding: 15px;
				margin: 0;
			}
		}
	}
`;

const Signin = ({ loginHandler }) => {
	const [warring, setWarning] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const onClickLogin = (key) => (e) => {
		setLoginInfo({ ...loginInfo, [key]: e.target.value });
	};
	const onSignIn = () => {
		axios
			.post(`${config.serverUrl}`, loginInfo, {
				withCredentials: true,
			})
			.then((res) => loginHandler(res.data));
		if (!loginInfo.email || !loginInfo.password) {
			setErrorMessage("이메일과 비밀번호를 입력하세요");
			return;
		}
	};
	return (
		<SigninSection>
			<input
				type="email"
				placeholder="이메일을 입력해주세요"
				onChange={onClickLogin("email")}
			/>
			<input
				type="password"
				placeholder="비밀번호를 입력해주세요"
				onChange={onClickLogin("password")}
			/>
			{warring && <div className="warring warPwd">다시 입력해주세요</div>}
			<BtnBox>
				<button className="desktopBtn kakao">
					<img src={kakao} alt="kakao" />
					로그인
				</button>
				<button className="desktopBtn naver">
					<img src={naver} alt="naver" />
					로그인
				</button>
				<button className="desktopBtn">로그인</button>
				<button className="mobileBtn kakao">
					<img src={kakao} alt="kakao" />
				</button>
				<button className="mobileBtn naver">
					<img src={naver} alt="naver" />
				</button>
				<button className="mobileBtn loginBtn">
					<img src={loginSVG} alt="loginSVG" />
				</button>
				<div className="alert-box">{errorMessage}</div>
			</BtnBox>
		</SigninSection>
	);
};

export default Signin;
