import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, color } from "../components/utils/theme";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";

// 컴포넌트
import Signdel from "../modal/Signdel";
import Pass from "../modal/Pass";

const PutUserInfoBox = styled.div`
	${flexCenter}
	flex-direction: column;

	input {
		height: 1.4rem;
		text-align: center;
		margin-bottom: 0.4rem;
		margin-top: 1rem;
		width: 100%;
		border: none;
		background-color: #2c2c2c;
		border-radius: 1vh;

		@media ${(props) => props.theme.mobileL} {
			&::placeholder {
				font-size: 0.5rem;
			}
		}
	}

	button {
		color: ${color.point};
		background: none;
		border: 3px solid ${color.point};
		border-radius: 1vh;
		width: 6.8rem;
		height: 2.4rem;
		font-weight: bold;
		font-size: 1.1rem;
		margin: 1rem 0.8rem 0rem;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: ${color.white};
		}
	}

	.btnBox {
		display: flex;
		justify-content: center;

		.delUser {
			background: ${color.point};
			color: ${color.white};
		}
		.passwordUser {
			background: ${color.point};
			margin-left: 2rem;
			color: ${color.white};
		}
	}
`;

const ImgDiv = styled.div`
	width: 15rem;
	height: 14rem;
	position: relative;
	border: 4px solid ${color.point};
	border-radius: 50%;
	overflow: hidden;
	&:hover {
		background-color: #f7caca;
		border: 4px dashed ${color.point};
	}
	> .img {
		width: 100%;
		height: 100%;
	}
	> input {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
`;

// 모달 디자인
const signdelModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 2,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		border: "1px solid #0f0d00",
		background: "#0f0d00",
		margin: "0 auto",
		overflow: "auto",
		height: "30vh",
		width: "40vw",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const passwordModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 2,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		border: "1px solid #0f0d00",
		background: "#0f0d00",
		margin: "0 auto",
		overflow: "auto",
		height: "30vh",
		width: "40vw",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const PutUserInfo = () => {
	const user = useSelector((state) => state.user);

	const [img, setImg] = useState({});
	const [deleteUserModal, setDeleteUserModal] = useState(false);
	const [patchUserModal, setPatchUserModal] = useState(false);

	const deleteModal = () => {
		setDeleteUserModal(!deleteUserModal);
	};

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				userName: "",
				password: "",
				newpassword: "",
			},
			validationSchema: Yup.object({
				userName: Yup.string().max(10, "10글자 미만이여야 합니다."),
				password: Yup.string().min(8, "8글자 이상이여야 합니다."),
				newpassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다.")
					.required("비밀번호를 입력하세요"),
			}),
			onSubmit: (values) => {},
		});

	useEffect(() => {
		setImg({ ...img, imagePreviewUrl: user.userInfo.profileImg });
	}, [user]);

	const profileImg = (e) => {
		if (e.target.files[0]) {
			let reader = new FileReader();
			let file = e.target.files[0];
			console.log(file);
			reader.onload = () => {
				setImg({
					file: file,
					imagePreviewUrl: reader.result,
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const patchModal = () => {
		setPatchUserModal(!patchUserModal);
	};

	const patchUser = () => {
		let userInput = 0;
		for (let user in values) {
			if (!values[user]) {
				userInput++;
			}
		}
		if (!img.file) {
			userInput++;
		}
		if (userInput === 4) return swal("수정될 정보가 없습니다.");
		patchModal();
	};

	return (
		<PutUserInfoBox>
			<Modal
				isOpen={deleteUserModal}
				style={signdelModal}
				onRequestClose={deleteModal}
				ariaHideApp={false}
			>
				<Signdel deleteModal={deleteModal} />
			</Modal>
			<Modal
				isOpen={patchUserModal}
				style={passwordModal}
				onRequestClose={patchModal}
				ariaHideApp={false}
			>
				<Pass patchModal={patchModal} values={values} img={img} />
			</Modal>
			<div>
				<ImgDiv>
					<input
						type="file"
						name="filename"
						accept="image/*"
						onChange={(e) => profileImg(e)}
					/>
					<img className="img" src={img.imagePreviewUrl} alt="profile" />
				</ImgDiv>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					name="userName"
					type="text"
					placeholder="변경하실 닉네임을 입력해주세요"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.username}
				/>
				{touched.userName && errors.userName ? (
					<div>{errors.userName}</div>
				) : null}
				<input
					name="password"
					type="password"
					placeholder="변경하실 비밀번호를 입력해주세요"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.password}
				/>
				{touched.password && errors.password ? (
					<div>{errors.password}</div>
				) : null}
				<input
					name="newpassword"
					type="password"
					placeholder="변경하실 비밀번호를 한번 더 입력해주세요"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.newpassword}
				/>
				{touched.newpassword && errors.newpassword ? (
					<div>{errors.newpassword}</div>
				) : null}
				<div className="btnBox">
					<button className="btn" onClick={patchUser}>
						회원정보수정
					</button>
					<button className="delUser" onClick={deleteModal}>
						회원탈퇴
					</button>
				</div>
			</form>
		</PutUserInfoBox>
	);
};

export default PutUserInfo;
