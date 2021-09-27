import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUserInfo } from "../redux/modules/users";
axios.defaults.withCredentials = true;

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
	background-color: #efefd2;

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

const Singup = ({ reverseBoo }) => {
	const [auth, setAuth] = useState(true);
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Name, setName] = useState("");
	const [ConfirmPasword, setConfirmPasword] = useState("");
	const [hash, setHash] = useState("");
	const [userCode, setUserCode] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				email: "",
				name: "",
				password: "",
				passwordConfirm: "",
				provider: "normal",
			},
			validationSchema: Yup.object({
				email: Yup.string()
					.email("이메일을 정확히 입력하세요")
					.min(8, "너무 짧습니다.")
					.required("이메일을 입력하세요"),
				name: Yup.string()
					.min(3, "너무 짧습니다.")
					.max(10, "너무 깁니다.")
					.required("닉네임을 입력하세요"),
				password: Yup.string()
					.min(8, "너무 짧습니다.")
					.required("비밀번호를 입력하세요"),
				passwordConfirm: Yup.string()
					.oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다.")
					.required("비밀번호를 입력하세요"),
			}),
			onSubmit: (values) => {
				console.log(values);
				// dispatch(registerUser(values));
				// alert(JSON.stringify(values, null, 2));
			},
		});

	const checkCode = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}user/emailcheck`, {
				code: userCode,
				hashedcode: hash,
			})
			.then(() => {
				axios
					.post(`${process.env.REACT_APP_API_URL}user/signup`, values)
					.then(() => {
						alert("회원가입이 완료되었습니다!");
						reverseBoo();
						dispatch(getUserInfo());
					});
			});
	};

	const signup = () => {
		setAuth(false);
		axios
			.post(`${process.env.REACT_APP_API_URL}user/emailcode`, {
				email: values.email,
			})
			.then((code) => {
				setHash(code.data.data.hashedcode);
			});
	};

	const code = (e) => {
		setUserCode(e.target.value);
	};

	return (
		<SignupSection onSubmit={(e) => e.preventDefault()}>
			{auth ? (
				<>
					<input
						name="email"
						type="text"
						placeholder="이메일을 입력해주세요"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.email}
					/>
					{touched.email && errors.email ? <div>{errors.email}</div> : null}
					<input
						name="name"
						type="text"
						placeholder="닉네임을 입력해주세요"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.name}
					/>
					{touched.name && errors.name ? <div>{errors.name}</div> : null}
					<input
						name="password"
						type="password"
						placeholder="비밀번호를 입력해주세요"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.password}
					/>
					{touched.password && errors.password ? (
						<div>{errors.password}</div>
					) : null}
					<input
						name="passwordConfirm"
						type="password"
						placeholder="비밀번호를 한번 더 입력해주세요"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.passwordConfirm}
					/>
					{touched.passwordConfirm && errors.passwordConfirm ? (
						<div>{errors.passwordConfirm}</div>
					) : null}
					<button onClick={signup}>회원가입</button>
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
					<input
						placeholder="인증코드를 입력해주세요"
						onChange={(e) => code(e)}
					/>
					<button
						onClick={checkCode}
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
