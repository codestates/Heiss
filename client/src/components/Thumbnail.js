import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import ReviewModal from "../modal/ReviewModal";
import heartIcon from "../img/heart.svg";
import noneheartIcon from "../img/noneheart.svg";
import cartIcon from "../img/cart.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal } from "../redux/modules/users";
import { reviewDatas } from "../redux/modules/review";

const ThumbnailAllBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ThumbnailSection = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 300px;
	height: 300px;
	min-width: 220px;
	width: 220px;
	margin: 1rem;
	position: relative;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		border-radius: 2vh;
	}

	&:hover {
		.hover-thumb {
			display: flex;
		}
	}
`;

const HoverThumb = styled.div`
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	position: absolute;
	/* background: rgba(128, 128, 128, 0.5); */
	border-radius: 2vh;
	z-index: 2;

	.heart {
		height: 2rem;
		margin: 1rem;
		margin-left: 5rem;
		z-index: 2;
	}
`;

const HoverThumbBottom = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 2rem;
	margin-left: 1rem;
	margin-bottom: 0.5rem;
	z-index: 2;

	.shareBtn {
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

	.cart {
		height: 2rem;
		margin-left: 7rem;
		/* border-radius: 50%; */
	}
`;

const BgnHover = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(128, 128, 128, 0.5);
	border-radius: 2vh;
`;

const HeartHowMany = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-top: 1px;
	margin-left: 1rem;

	div {
		color: #f47676;
	}

	img {
		height: 1rem;
		margin-left: 3px;
	}
`;

// 모달 스타일
const ThumbnailModal = {
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
		width: "80vw",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const Thumbnail = ({ data, shotBtn, shareBtn }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const review = useSelector((state) => state.review);
	const [toggleH, setToggleH] = useState(false);
	const [boo, setBoo] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};

	useEffect(() => {
		if (data.liked) {
			setToggleH(true);
		}
	}, []);

	const postLike = () => {
		if (!user.isLogin) {
			return dispatch(handleLoginModal());
		}
		axios
			.post(
				`${process.env.REACT_APP_API_URL}review/like`,
				{
					reviewId: data.id,
				},
				{ withCredentials: true }
			)
			.then(() => {
				setToggleH(!toggleH);
				dispatch(reviewDatas());
			});
	};

	if (!data) {
		return null;
	}

	return (
		<ThumbnailAllBox>
			<Modal
				isOpen={boo}
				style={ThumbnailModal}
				onRequestClose={reverseBoo}
				ariaHideApp={false}
			>
				<ReviewModal dataId={data.id} reverseBoo={reverseBoo} />
			</Modal>
			<ThumbnailSection>
				<img src={data.sources[0].imgUrl} alt="img" />
				<HoverThumb className="hover-thumb">
					<BgnHover onClick={reverseBoo}></BgnHover>
					{toggleH ? (
						<img
							src={heartIcon}
							alt="heartIcon"
							onClick={postLike}
							className="heart"
						/>
					) : (
						<img
							src={noneheartIcon}
							alt="noneheartIcon"
							onClick={postLike}
							className="heart"
						/>
					)}
					<HoverThumbBottom>
						{data.user.id !== user.userInfo.id
							? shareBtn && (
									<button className="shareBtn" onClick={postLike}>
										퍼가기
									</button>
							  )
							: null}
						{shotBtn && <img src={cartIcon} alt="cartIcon" className="cart" />}
					</HoverThumbBottom>
				</HoverThumb>
			</ThumbnailSection>
			<HeartHowMany>
				<div>{data.like}</div>
				<img src={heartIcon} alt="heartIcon" />
			</HeartHowMany>
		</ThumbnailAllBox>
	);
};

export default Thumbnail;
