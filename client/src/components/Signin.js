import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "../img/카카오.png";
import naver from "../img/네이버.png";
import loginSVG from "../img/login.png";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/modules/users";
import * as Yup from "yup";
import { useFormik } from "formik";

const SigninSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 35vh;
	width: 100%;
	padding: 3rem;
	box-sizing: border-box;
	border: 3px solid #f47676;
	margin: 0;

	@media ${(props) => props.theme.tablet} {
		height: 40vh;
	}

	input {
		margin-top: 1rem;
		width: 30vw;
		margin-bottom: 20px;
		border: none;
		height: 30px;
		background: #2c2c2c;
		border-radius: 1vh;
		@media ${(props) => props.theme.mobileL} {
			width: 45vw;
			font-size: 0.5rem;
			&:first-child {
				margin-top: 2rem;
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
		margin-bottom: 0.8rem;
	}

	.desktopBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		background: #f47676;
		border: 1px solid #f47676;
		color: #2c2c2c;
		&:hover {
			transform: scale(1.04);
		}

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

const Signin = () => {
	const [warring, setWarning] = useState(false);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},

		validationSchema: Yup.object({
			email: Yup.string()
				.email("올바른 이메일 주소가 아닙니다")
				.required("이메일을 입력하세요"),
			password: Yup.string().min(8, "").required("비밀번호를 입력하세요"),
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values));
			alert(JSON.stringify(values, null, 2));
		},
	});
	// console.log(loginUser÷, "dd");
	const validate = (values) => {
		const errors = {}; //에러를 반환할 빈 객체

		//firstName 값이 없다면
		if (!values.firstName) {
			errors.firstName = "Required"; //firstName키에 필수(Required)라는 문자열 저장
		}
		//firstName 값의 길이가 15보다 크면
		else if (values.firstName.length > 15) {
			errors.firstName = "Must be 15 characters or less"; //15글자 이하여야된다는 문자열 저장
		}

		//lastName 값이 없다면
		if (!values.lastName) {
			errors.lastName = "Required"; //lastName키에 필수(Required)문자열 저장
		}
		//lastName 값의 길이가 20보다 크면
		else if (values.lastName.length > 20) {
			errors.lastName = "Must be 20 characters or less"; //20글자 이하여야된다는 문자열 저장
		}

		//email 값이 없다면
		if (!values.email) {
			errors.email = "Required";
		}
		//email 값이 정규 표현식을 만족하지 못하면
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = "Invalid email address"; //잘못된 이메일 형식
		}

		return errors;
	};

	return (
		<SigninSection onSubmit={formik.handleSubmit}>
			<input
				name="email"
				type="email"
				placeholder="이메일을 입력해주세요"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<input
				name="password"
				type="password"
				placeholder="비밀번호를 입력해주세요"
				onChange={formik.handleChange}
				value={formik.values.password}
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
				<div className="alert-box" />
			</BtnBox>
		</SigninSection>
	);
};

export default withRouter(Signin);
