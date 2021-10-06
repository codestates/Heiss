import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUserInfo, handleLoginModal } from "../redux/modules/users";
import { flexCenter, color, ImgDivs } from "./utils/theme";
import profile from "../img/profile.png";
import Modal from "react-modal";
import FindPasswordModal from "../modal/FindPasswordModal";
import swal from "sweetalert";

axios.defaults.withCredentials = true;

const SignupSection = styled.form`
	${flexCenter}
	flex-direction: column;
	width: 100%;
	border: 3px solid ${color.white};
	box-sizing: border-box;
	margin: 0;
	background-color: #efefd2;
	text-align: left;
	
	.warring {
		color: ${color.warring};
		text-align: center;
		font-size: 0.5rem;
	}

	.btnBox {
		display: flex;
		justify-content: center;	
	}

	.btn {
		background: ${color.point};
		color: ${color.white};
		font-weight: bold;
		font-size: 0.8rem;
		border-radius: 1.4vh;
		padding: 0.6rem;
		width: 6rem;
		margin: 1rem 1.5rem 0rem;
		@media ${(props) => props.theme.mobileL} {
			height: 2rem;
			font-size: 0.2rem;
			margin: 1rem 0.3rem 0rem;
		}
	}

	input {
		width: 20vw;
		margin-top: 14px;
		margin-bottom: 6px;
		border: none;
		background: #2c2c2c;
		border-radius: 1vh;
		&::placeholder {
			color: ${color.white};
		}
		@media ${(props) => props.theme.tablet} {
			width: 20rem;
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

	.userWrap {
		display: flex;
		justify-content: space-around;
		width: 100%;
		
		@media ${(props) => props.theme.tablet} {
			flex-direction: column;
			align-items: center;
			justify-content: center;

			div {
				width: 100%;
			}
		}
	}

	@media ${(props) => props.theme.tablet} {
		height: 70vh;
	}

	.inputWrap{
		${flexCenter}
		flex-direction: column;
	}
`;

const SignupBox = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 1rem;
`;

const ImgDiv = styled.div`
	${ImgDivs}

	@media ${(props) => props.theme.tablet} {
		max-width: 10rem;
		max-height: 10rem;
	}
`;

const passwordModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 4,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		background: "#ffffe7",
		overflow: "auto",
		top: "40vh",
		left: "30vw",
		right: "30vw",
		bottom: "40vh",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		zIndex: 4,
	},
};

const Singup = () => {
	const [auth, setAuth] = useState(true);
	const [hash, setHash] = useState("");
	const [userCode, setUserCode] = useState("");
	const [img, setImg] = useState({});
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				email: "",
				userName: "",
				password: "",
				passwordConfirm: "",
				provider: "normal",
			},
			validationSchema: Yup.object({
				email: Yup.string()
					.email("이메일을 정확히 입력하세요")
					.min(8, "너무 짧습니다.")
					.required("이메일을 입력하세요"),
				userName: Yup.string()
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
				if (auth) {
					signup();
				}
			},
		});

	const checkCode = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}user/emailcheck`, {
				code: userCode,
				hashedcode: hash,
			})
			.then(() => {
				const formData = new FormData();
				for (let el in values) {
					formData.append(el, values[el]);
				}
				formData.append("picture", img.file);
				axios
					.post(`${process.env.REACT_APP_API_URL}user/signup`, formData, {
						header: { "Content-Type": "multipart/form-data" },
					})
					.then(() => {
						swal("회원가입이 완료되었습니다!");
						dispatch(handleLoginModal());
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

	const profileImg = (e) => {
		if (e.target.files[0]) {
			let reader = new FileReader();
			let file = e.target.files[0];
			reader.onload = () => {
				setImg({
					file: file,
					imagePreviewUrl: reader.result,
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const findPasswordModal = () => {
		setModal(!modal);
	};

	return (
		<SignupSection onSubmit={handleSubmit}>
			<Modal
				isOpen={modal}
				style={passwordModal}
				onRequestClose={findPasswordModal}
				ariaHideApp={false}
			>
				<FindPasswordModal findPasswordModal={findPasswordModal} />
			</Modal>
			{auth ? (
				<SignupBox>
					<div className="userWrap">
						<ImgDiv>
							<input
								type="file"
								name="filename"
								accept="image/*"
								onChange={(e) => profileImg(e)}
							/>
							<img
								className="img"
								src={img.imagePreviewUrl ?? profile}
								alt="profile"
							/>
						</ImgDiv>
						<div className='inputWrap'>
							<input
								name="email"
								type="text"
								placeholder="이메일을 입력해주세요"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
							/>
							{touched.email && errors.email ? <div className='warring'>{errors.email}</div> : null}
							<input
								name="userName"
								type="text"
								placeholder="닉네임을 입력해주세요"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.username}
							/>
							{touched.userName && errors.userName ? (
								<div className='warring'>{errors.userName}</div>
							) : null}
							<input
								name="password"
								type="password"
								placeholder="비밀번호를 입력해주세요"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
							/>
							{touched.password && errors.password ? (
								<div className='warring'>{errors.password}</div>
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
								<div className='warring'>{errors.passwordConfirm}</div>
							) : null}
						</div>
					</div>
					<div className="btnBox">
						<button type="submit" className="btn">
							회원가입
						</button>
						<button className="btn" onClick={findPasswordModal}>
							비밀번호찾기
						</button>
					</div>
				</SignupBox>
			) : (
				<>
					<h3>메일로 인증번호를 보냈습니다</h3>
					<input
						placeholder="인증코드를 입력해주세요"
						onChange={(e) => code(e)}
					/>
					<button onClick={checkCode} className="btn">
						인증
					</button>
				</>
			)}
		</SignupSection>
	);
};

export default withRouter(Singup);
