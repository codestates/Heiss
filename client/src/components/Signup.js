import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../redux/modules/users";

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

const Singup = (props) => {
	const [auth, setAuth] = useState(false);
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Name, setName] = useState("");
	const [ConfirmPasword, setConfirmPasword] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	// const handleInputValue = (key) => (e) => {
	// 	setUserInfo({ ...userInfo, [key]: e.target.value });
	// };
	// const handleSignup = (e) => {
	// 	const { email, username, password } = userInfo;

	// 	e.preventDefault();
	// 	axios
	// 		.post(`${process.env.REACT_APP_API_URL}`, userInfo)
	// 		.then(() => {
	// 			alert("회원가입 되었습니다! 로그인 해주세요.");
	// 		})
	// 		.then(() => {
	// 			return history.push("/");
	// 		});
	// };

	// const { isLogin, error } = useSelector((state) => state.signUp);
	// const dispatch = useDispatch();

	// const handleSignup = (email, nickname, userId) => {
	// 	dispatch(signUP(email, nickname, userId));
	// };
	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onNickHandler = (e) => {
		setName(e.currentTarget.value);
	};

	const onPasswordHanlder = (e) => {
		setPassword(e.currentTarget.value);
	};

	const onConfirmPasswordHandler = (e) => {
		setConfirmPasword(e.currentTarget.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (Password === ConfirmPasword) {
			let body = {
				email: Email,
				name: Name,
				password: Password,
			};
			dispatch(registerUser(body)).then((res) => {
				alert("가입이 정상적으로 완료되었습니다");
				// props.history.push("/login");
			});
		} else {
			alert("비밀번호가 일치하지 않습니다");
		}
	};
	return (
		<SignupSection onSubmit={onSubmitHandler}>
			{!auth ? (
				<>
					<input
						type="email"
						placeholder="이메일을 입력해주세요"
						onChange={onEmailHandler}
					/>
					<input
						type="nickname"
						placeholder="닉네임을 입력해주세요"
						onChange={onNickHandler}
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력해주세요"
						onChange={onPasswordHanlder}
					/>
					<input
						type="password"
						placeholder="비밀번호를 한번 더 입력해주세요"
						onChange={onConfirmPasswordHandler}
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

export default withRouter(Singup);
