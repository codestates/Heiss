import React, { useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ReviewWriteModal from "../modal/ReviewWriteModal";
import { getUserInfo, getLogout } from "../redux/modules/users";
import { handleRevieWritewModal, reviewDatas } from "../redux/modules/review";
import { handleLoginModal } from "../redux/modules/users";
import swal from "sweetalert";

import logo from "../img/heiss.svg";
import Sign from "../modal/Sign";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
axios.defaults.withCredentials = true;

const NavSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	height: 4vh;
	background: none;
	padding: 1rem;
	#heissLogo {
		height: 30px;
		margin-left: 10px;
	}
	button {
		color: #f6f7df;
		font-size: 1rem;
	}

	.navBarState {
		color: black;
	}
`;

const signModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		margin: "0 auto",
		zIndex: 2,
	},
	content: {
		border: "1px solid #0f0d00",
		background: "#0f0d00",
		overflow: "auto",
		top: "10vh",
		left: "10vw",
		right: "10vw",
		bottom: "10vh",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		zIndex: 2,
	},
};

const ProfileBox = styled.div`
	display: flex;
	align-items: center;

	.profileBox {
		background: #3d3d3d;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
		margin-right: 0.5rem;
	}

	.reviewBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		font-weight: bold;
		height: 2rem;
		width: 5rem;
		border: 4px solid #f47676;
		border-radius: 1vh;
		transition: all 0.3s;
		margin-right: 0.5rem;

		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
	}
`;

// 리뷰작성 모달 스타일
const reviewModal = {
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
		top: "10vh",
		left: "10vw",
		right: "10vw",
		bottom: "10vh",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const Nav = ({ reviewBtn }) => {
	const user = useSelector((state) => state.user);
	const review = useSelector((state) => state.review);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);

	const loginHandler = () => {
		dispatch(handleLoginModal());
	};

	const reviewWriteHandler = () => {
		dispatch(handleRevieWritewModal());
	};

	const logout = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}user/signout`)
			.then(() => {
				dispatch(getLogout());
			})
			.then(() => {
				swal("로그아웃 되었습니다. 다음에 또 찾아주세요!");
				let url = window.location.pathname;
				window.location.replace(url);
			});
	};

	return (
		<NavSection>
			<Modal
				isOpen={user.loginModal}
				style={signModal}
				onRequestClose={loginHandler}
				ariaHideApp={false}
			>
				<Sign />
			</Modal>

			<Modal
				isOpen={review.reviewWriteModal}
				style={reviewModal}
				onRequestClose={reviewWriteHandler}
				ariaHideApp={false}
			>
				<ReviewWriteModal />
			</Modal>

			<Link to="/">
				<img id="heissLogo" src={logo} alt="heiss" />
			</Link>
			{!user.isLogin ? (
				<button onClick={loginHandler}>LOGIN</button>
			) : (
				<ProfileBox>
					{reviewBtn && (
						<button className="reviewBtn" onClick={reviewWriteHandler}>
							리뷰 작성
						</button>
					)}
					<Link className="profileBox" to="/mypage">
						<img src={user.userInfo.profileImg} alt="profile" />
					</Link>
					<button onClick={logout}>LOGOUT</button>
				</ProfileBox>
			)}
		</NavSection>
	);
};

export default Nav;
