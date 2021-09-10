import React from "react";
import styled from "styled-components";

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
	return (
		<SignupSection>
			<input type="email" placeholder="이메일을 입력해주세요" />
			<input type="nickname" placeholder="닉네임을 입력해주세요" />
			<input type="password" placeholder="비밀번호를 입력해주세요" />
			<input type="password" placeholder="비밀번호를 한번 더 입력해주세요" />
			<button>회원가입</button>
		</SignupSection>
	);
};

export default Singup;
