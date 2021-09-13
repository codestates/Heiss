import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const SignupSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 36vh;
	border: 3px solid #ffffe7;
	padding: 2rem;
	input {
		width: 50vw;
		margin-bottom: 13px;
		border: 2px solid #ffffe7;

		@media ${(props) => props.theme.mobileL} {
			width: 9rem;
			font-size: 0.5rem;
			height: 0.7rem;
			&::placeholder {
				font-size: 0.5rem;
			}
			border: none;
			background: lightgray;
			border-radius: 1vh;
		}
	}
	button {
		color: #f5f5f3;
		font-weight: bold;
		font-size: 18px;
		width: 130px;

		@media ${(props) => props.theme.mobileL} {
			width: 3rem;
			height: 1rem;
			font-size: 0.3rem;
			background: white;
			border: 3px solid white;
			color: black;
		}
	}
`;

const Singup = () => {
	const [userInfo, setUserInfo] = useState({
		email: "",
		nickname: "",
		password: "",
	});
	const history = useHistory();
	const handleInputValue = (key) => (e) => {
		setUserInfo({ ...userInfo, [key]: e.target.value });
	};

	const checkPassword = (e) => {
		//  8 ~ 10자 영문, 숫자 조합
		let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
		console.log(regExp);
	};

	const handleSignup = (e) => {
		const { email, username, password } = userInfo;

		e.preventDefault();
		axios
			.post(``, userInfo)
			.then(() => {
				alert("회원가입 되었습니다! 로그인 해주세요.");
			})
			.then(() => {
				return history.push("/");
			});
	};

	return (
		<SignupSection>
			<input
				placeholder="이메일을 입력해주세요"
				type="email"
				onChange={handleInputValue("email")}
			/>
			<input
				type="nickname"
				placeholder="닉네임을 입력해주세요"
				onChange={handleInputValue("nickname")}
			/>
			<input
				type="password"
				placeholder="비밀번호를 입력해주세요"
				onChange={handleInputValue("password")}
			/>
			<input
				type="password"
				placeholder="비밀번호를 한번 더 입력해주세요"
				onBlur={checkPassword}
			/>
			<button onClick={handleSignup}>회원가입</button>
		</SignupSection>
	);
};

export default Singup;
