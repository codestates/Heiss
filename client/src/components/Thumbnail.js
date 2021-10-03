import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
import { ThumbnailSections, HoverThumbs, BgnHovers } from "./utils/theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal } from "../redux/modules/users";
import { reviewDatas } from "../redux/modules/review";
import ReviewModal from "../modal/ReviewModal";

// 이미지
import heartIcon from "../img/heart.svg";
import noneheartIcon from "../img/noneheart.svg";
axios.defaults.withCredentials = true;

const ThumbnailAllBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ThumbnailSection = styled.div`
	${ThumbnailSections}
`;

const HoverThumb = styled.div`
	${HoverThumbs}
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
`;

const BgnHover = styled.div`
	${BgnHovers}
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
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const review = useSelector((state) => state.review);
	const [toggleH, setToggleH] = useState(false);
	const [modal, setModal] = useState(false);

	const modalHandler = () => {
		setModal(!modal);
	};

	useEffect(() => {
		console.log(data);
		if (data.liked) {
			setToggleH(true);
		}
	}, []);

	const postLike = () => {
		if (!user.isLogin) {
			return dispatch(handleLoginModal());
		}
		axios
			.post(`${process.env.REACT_APP_API_URL}review/like`, {
				reviewId: data.id,
			})
			.then(() => {
				setToggleH(!toggleH);
				dispatch(reviewDatas());
			});
	};

	const scrapCase = (id) => {
		axios.post(`${process.env.REACT_APP_API_URL}case`, { id }).then(() => {
			if (window.confirm("보관함으로 이동하시겠습니까?")) {
				history.push("/mypage");
			}
		});
	};

	if (!data) {
		console.log(data);
		return null;
	}

	return (
		<ThumbnailAllBox>
			<Modal
				isOpen={modal}
				style={ThumbnailModal}
				onRequestClose={modalHandler}
				ariaHideApp={false}
			>
				<ReviewModal dataId={data.id} modalHandler={modalHandler} />
			</Modal>
			<ThumbnailSection>
				<img src={data.sources[0].imgUrl} alt="img" />
				<HoverThumb className="hover-thumb">
					<BgnHover onClick={modalHandler}></BgnHover>
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
									<button
										className="shareBtn"
										onClick={() => scrapCase(data.id)}
									>
										퍼가기
									</button>
							  )
							: null}
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
