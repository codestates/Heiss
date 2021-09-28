import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ReviewWriteModal from "../modal/ReviewWriteModal";

import logo from "../img/heiss.svg";
import Sign from "../modal/Sign";

import profile from "../img/profile.png";

const NavSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	height: 4vh;
	/* background: #c3c4ad; */
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
	const [boo, setBoo] = useState(false);
	const [login, setLogin] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};

	const [review, setReview] = useState(false);

	const reverseReview = () => {
		setReview(!review);
	};

	return (
		<NavSection>
			<Modal
				isOpen={boo}
				style={signModal}
				onRequestClose={() => reverseBoo()}
				ariaHideApp={false}
			>
				<Sign reverseBoo={reverseBoo} />
			</Modal>

			<Modal
				isOpen={review}
				style={reviewModal}
				onRequestClose={() => reverseReview()}
				ariaHideApp={false}
			>
				<ReviewWriteModal closeModal={setReview} />
			</Modal>

			<Link to="/">
				<img id="heissLogo" src={logo} alt="heiss" />
			</Link>
			{login ? (
				<button onClick={reverseBoo}>LOGIN</button>
			) : (
				<ProfileBox>
					{reviewBtn && (
						<button className="reviewBtn" onClick={reverseReview}>
							리뷰 작성
						</button>
					)}
					<Link className="profileBox" to="/mypage">
						<img src={profile} alt="profile" />
					</Link>
					<button onClick={() => setLogin(!login)}>LOGOUT</button>
				</ProfileBox>
			)}
		</NavSection>
	);
};

export default Nav;
