import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";

const SignupSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 35vh;
	width: 100%;
	border: 3px solid #ffffe7;
	padding: 3rem;
	box-sizing: border-box;
	margin: 0;

	@media ${(props) => props.theme.tablet} {
		height: 50vh;
	}

	input {
		width: 30vw;
		margin-bottom: 13px;
		border: none;
		background: #2c2c2c;
		border-radius: 1vh;

		&::placeholder {
			color: #ffffe7;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 45vw;
			height: 3px;
			font-size: 0.5rem;
			&::placeholder {
				font-size: 0.5rem;
			}
		}
	}
	button {
		background-color: #f5f5f3;
		font-weight: bold;
		font-size: 18px;
		border-radius: 1.4vh;
		border: 3px solid #ffffe7;
		padding: 0.4rem;
		width: 130px;

		@media ${(props) => props.theme.mobileL} {
			width: 4rem;
			height: 2rem;
			font-size: 0.3rem;
			background: #ffffe7;
			border: 3px solid #ffffe7;
			color: black;
		}
	}
`;

const Singup = () => {
	const [auth, setAuth] = useState(false);
	const [userInfo, setUserInfo] = useState({
		email: "",
		nickname: "",
		password: "",
	});
	const history = useHistory();
	const handleInputValue = (key) => (e) => {
		setUserInfo({ ...userInfo, [key]: e.target.value });
	};
	const handleSignup = (e) => {
		const { email, username, password } = userInfo;

		e.preventDefault();
		axios
			.post(`${config.serverUrl}`, userInfo)
			.then(() => {
				alert("회원가입 되었습니다! 로그인 해주세요.");
			})
			.then(() => {
				return history.push("/");
			});
	};

	// const { isLogin, error } = useSelector((state) => state.signUp);
	// const dispatch = useDispatch();

	// const handleSignup = (email, nickname, userId) => {
	// 	dispatch(signUP(email, nickname, userId));
	// };
	return (
		<SignupSection>
			{!auth ? (
				<>
					<input type="email" placeholder="이메일을 입력해주세요" />
					<input type="nickname" placeholder="닉네임을 입력해주세요" />
					<input type="password" placeholder="비밀번호를 입력해주세요" />
					<input
						type="password"
						placeholder="비밀번호를 한번 더 입력해주세요"
					/>
					<button onClick={() => setAuth(!auth)}>회원가입</button>
				</>
			) : (
				<>
					<button
						disabled
						style={{
							marginBottom: "10px",
							background: "none",
							color: "#ffffe7",
							border: "none",
							fontSize: "0.7rem",
							width: "100%",
						}}
					>
						메일로 인증번호를 보냈습니다
					</button>
					<input placeholder="인증코드를 입력해주세요" />
					<button
						style={{ marginTop: "10px", height: "1.8rem", width: "4rem" }}
					>
						인증
					</button>
				</>
			)}
		</SignupSection>
	);
};

export default Singup;

// const checkPassword = (e) => {
// 	//  8 ~ 10자 영문, 숫자 조합
// 	let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
// 	console.log(regExp);
// };
