import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import { useHistory } from "react-router";
import { flexCenter, color } from "../components/utils/theme";
import { patchUserInfo } from "../redux/modules/users";
import { newUserInfo } from "../redux/modules/users";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocker } from "../redux/modules/users";
import { getUserInfo } from "../redux/modules/users";

// 컴포넌트
import Nav from "./Nav";
import Signdel from "../modal/Signdel";
import Pass from "../modal/Pass";
import Locker from "../components/Locker";
import Cart from "../components/Cart";

// 이미지
import profile from "../img/profile.png";
import * as Yup from "yup";
import { useFormik } from "formik";
axios.defaults.withCredentials = true;

const MypageSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	color: #f6f7df;

	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const MypageBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		width: 100%;
	}
`;

const CategoryBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 220px;
	height: 40vh;
	position: sticky;
	top: 0;
	background: ${color.basic};
	border-radius: 1vh;
	box-sizing: border-box;
	padding: 15px;

	.userinfoBox {
		display: flex;
		align-items: flex-end;

		img {
			border-radius: 50%;
			min-width: 4rem;
			min-height: 4rem;
			width: 4rem;
			height: 4rem;
		}

		.username {
			font-size: 1.2rem;
			font-weight: bold;
		}

		@media ${(props) => props.theme.tablet} {
			flex-direction: column;
			align-items: center;

			.username {
				margin-top: 0.8rem;
				font-size: 1rem;
			}
		}
	}

	.navigator {
		margin-top: 3rem;

		div {
			margin-bottom: 1rem;
			cursor: pointer;

			@media ${(props) => props.theme.tablet} {
				font-size: 0.8rem;
			}
		}
	}

	@media ${(props) => props.theme.tablet} {
		width: 13vw;
	}

	@media ${(props) => props.theme.mobileL} {
		display: none;
	}
`;

const MainSection = styled.ul`
	display: flex;
	flex-direction: column;
	width: 85vw;
	box-sizing: border-box;
	border-radius: 1vh;
	padding: 15px;

	li {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin-bottom: 3rem;
	}

	@media ${(props) => props.theme.tablet} {
		width: 76vw;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 100vw;
	}
`;

const SaveBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
`;

const PutUserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

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
		@media ${(props) => props.theme.tablet} {
			flex-direction: column;

			.delUser {
				margin-left: 0;
			}
		}
	}
`;

const ImgDiv = styled.div`
	width: 15rem;
	height: 5rem;
	position: relative;
	border: 4px solid ${color.point};
	height: 14rem;
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

const Mypage = () => {
	const history = useHistory();
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
			if (el.data.message) {
				history.push("/");
			}
		});
	}, []);

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
			if (el.data.message) {
				history.push("/");
			}
		});
	}, []);

	const [deleteUserModal, setDeleteUserModal] = useState(false);
	const [patchUserModal, setPatchUserModal] = useState(false);
	const [locker, setLocker] = useState([]);
	const [img, setImg] = useState({});

	// 스크롤 이벤트 관리 상태 변수
	const [scrollToShop, setScrollToShop] = useState(0);
	const [scrollToSaveBox, setScorllToSaveBox] = useState(0);
	const [scrollToPutUserinfo, setScrollToPutUserinfo] = useState(0);

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

	const deleteModal = () => {
		setDeleteUserModal(!deleteUserModal);
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
		if (userInput === 4) return alert("수정될 정보가 없습니다.");
		patchModal();
	};

	const handleToShop = useCallback(() => {
		setScrollToShop(
			document.querySelector(".shop").scrollIntoView({ behavior: "smooth" })
		);
	}, []);

	const handleToSaveBox = useCallback(() => {
		setScorllToSaveBox(
			document.querySelector(".save-box").scrollIntoView({ behavior: "smooth" })
		);
	}, []);

	const handleToPutUserinfo = useCallback(() => {
		setScrollToPutUserinfo(
			document
				.querySelector(".put-userinfo")
				.scrollIntoView({ behavior: "smooth" })
		);
	}, []);

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

	const getMyCase = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}locker`)
			.then((res) => res.data)
			.then((data) => setLocker(data.data));
	};

	useEffect(() => {
		getMyCase();
	}, []);

	return (
		<MypageSection>
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
			<Nav />
			<MypageBox>
				<CategoryBox>
					<div className="userinfoBox">
						<img src={profile} alt="profile" />
						<div className="username">NICKNAME</div>
					</div>
					<div className="navigator">
						<div value={scrollToSaveBox} onClick={handleToSaveBox}>
							보관함
						</div>
						<div value={scrollToShop} onClick={handleToShop}>
							장바구니
						</div>
						<div value={scrollToPutUserinfo} onClick={handleToPutUserinfo}>
							회원정보수정
						</div>
					</div>
				</CategoryBox>
				<MainSection>
					<li className="save-box">
						<div className="title">보관함</div>
						<SaveBox>
							{locker.map((data) => (
								<Locker data={data} key={data.id} getMyCase={getMyCase} />
							))}
						</SaveBox>
					</li>
					<li className="shop">
						<div className="title">장바구니</div>
						<Cart />
					</li>
					<li className="put-userinfo">
						<div className="title">회원정보수정</div>

						<PutUserInfoBox>
							<div>
								<ImgDiv>
									<input
										type="file"
										name="filename"
										accept="image/*"
										onChange={(e) => profileImg(e)}
									/>
									<img
										className="img"
										src={img.imagePreviewUrl}
										alt="profile"
									/>
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
					</li>
				</MainSection>
			</MypageBox>
		</MypageSection>
	);
};

export default Mypage;
