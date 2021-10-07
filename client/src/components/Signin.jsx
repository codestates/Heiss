import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "../img/카카오.png";
import naver from "../img/네이버.png";
import loginSVG from "../img/login.png";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/modules/users";
import * as Yup from "yup";
import { useFormik } from "formik";
import { handleLoginModal, handleAlertModal } from "../redux/modules/users";
import { flexCenter, color } from "./utils/theme";
axios.defaults.withCredentials = true;

const SigninSection = styled.form`
	color: ${color.white};
	${flexCenter}
	flex-direction: column;
	height: 35vh;
	width: 100%;
	padding: 3rem;
	box-sizing: border-box;
	border: 3px solid ${color.point};
	margin: 0;

	input {
		margin-top: 1rem;
		margin-bottom: 20px;
		width: 30vw;
		height: 30px;
		border: none;
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
		color: ${color.warring};
		font-size: 0.5rem;
	}
	button {
		color: #f5f5f3;
		font-weight: bold;
		font-size: 18px;
		border: 3px solid ${color.white};
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
		${flexCenter}
		font-size: 0.8rem;
		background: ${color.point};
		border: 1px solid ${color.point};
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
		background: ${color.white};
	}
	.mobileBtn {
		display: none;
		margin: 3px;
		@media ${(props) => props.theme.mobileL} {
			${flexCenter}
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
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const test = async () => {
		dispatch(await handleAlertModal("로그인이 완료되었습니다"));
		dispatch(handleLoginModal());
		let url = window.location.pathname;
		window.location.replace(url);
		dispatch(getUserInfo());
	};

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
				provider: "normal",
			},

			validationSchema: Yup.object().shape({
				email: Yup.string()
					.email("올바른 이메일 주소가 아닙니다")
					.required("이메일을 입력하세요"),
				password: Yup.string()
					.min(8, "비밀번호는 8자보다 이상이여야 합니다")
					.required("비밀번호를 입력하세요"),
			}),
			onSubmit: async (values) => {
				let login = await axios.post(
					`${process.env.REACT_APP_API_URL}user/signin`,
					values
				);
				if (login.data.message === "No matching users") {
					dispatch(handleAlertModal("등록된 이메일이 없습니다"));
				} else if (login.data.message === "password err") {
					dispatch(handleAlertModal("비밀번호가 일치하지 않습니다"));
				} else {
					dispatch(handleAlertModal("로그인이 완료되었습니다"));
				}
			},
		});

	function kakaoclick() {
		const kakaourl = "https://kauth.kakao.com/oauth/authorize";
		const client_id = process.env.REACT_APP_KAKAO_CLIENT;
		const redirect_uri = process.env.REACT_APP_CLIENT_REDIRECT;
		const response_type = "code";
		const state = "kakao";
		const url = `${kakaourl}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}`;
		window.location.assign(url);
	}

	function naverclick() {
		const naverurl = "https://nid.naver.com/oauth2.0/authorize";
		const client_id = process.env.REACT_APP_NAVER_CLIENT;
		const redirect_uri = process.env.REACT_APP_CLIENT_REDIRECT;
		const response_type = "code";
		const state = "naver";
		const url = `${naverurl}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}`;
		window.location.assign(url);
	}

	return (
		<SigninSection onSubmit={handleSubmit}>
			<input
				name="email"
				type="text"
				placeholder="이메일을 입력해주세요"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.email}
			/>
			{touched.email && errors.email ? (
				<div className="warring">{errors.email}</div>
			) : null}
			<input
				name="password"
				type="password"
				placeholder="비밀번호를 입력해주세요"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.password}
			/>
			{touched.password && errors.password ? (
				<div className="warring">{errors.password}</div>
			) : null}
			<BtnBox>
				<button className="desktopBtn" type="submit">
					로그인
				</button>
				<button className="desktopBtn kakao" onClick={kakaoclick}>
					<img src={kakao} alt="kakao" />
					로그인
				</button>
				<button className="desktopBtn naver" onClick={naverclick}>
					<img src={naver} alt="naver" />
					로그인
				</button>
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
