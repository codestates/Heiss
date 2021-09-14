import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const SignupSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 30vh;
	width: 40vw;
	border: 3px solid #ffffe7;
	padding: 3rem;
	margin: 0;
	@media ${(props) => props.theme.mobileL} {
		width: 6rem;
	}

	input {
		width: 30vw;
		margin-bottom: 13px;
		/* border: 2px solid #ffffe7; */
		border: none;
		border-radius: 1vh;
		min-width: 9rem;
		background: rgba(255, 255, 231, 0.6);

		&::placeholder {
			color: #ffffe7;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 9rem;
			height: 3px;
			font-size: 0.5rem;
			&::placeholder {
				font-size: 0.5rem;
			}
		}
	}
	button {
		color: #f5f5f3;
		font-weight: bold;
		font-size: 18px;
		border-radius: 1.4vh;
		border: 3px solid #ffffe7;
		padding: 0.4rem;
		width: 130px;

		@media ${(props) => props.theme.mobileL} {
			width: 10rem;
			height: 3rem;
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

	const checkPassword = (e) => {
		//  8 ~ 10자 영문, 숫자 조합
		let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
		console.log(regExp);
	};

	const onClickLogin = (key) => (e) => {
		setUserInfo({ ...userInfo, [key]: e.target.value });
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
			{!auth ? (
				<>
					<input
						type="email"
						placeholder="이메일을 입력해주세요"
						onChange={onClickLogin("email")}
					/>
					<input
						type="nickname"
						placeholder="닉네임을 입력해주세요"
						onChange={onClickLogin("nickname")}
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력해주세요"
						onChange={onClickLogin("password")}
					/>
					<input
						type="password"
						placeholder="비밀번호를 한번 더 입력해주세요"
						onChange={onClickLogin("password")}
					/>
					<div>
						<button type="submit" onClick={() => setAuth(!auth)}>
							회원가입
						</button>
					</div>
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
