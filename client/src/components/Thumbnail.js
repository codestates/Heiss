import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
import { ThumbnailSections, HoverThumbs, BgnHovers } from "./utils/theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal, handleConfirmModal } from "../redux/modules/users";
import { reviewDatas } from "../redux/modules/review";
import ReviewModal from "../modal/ReviewModal";
import "./reviewModal.css";

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

const Thumbnail = ({ data, shareBtn }) => {
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
		if (!user.isLogin) {
			return dispatch(handleLoginModal());
		}
		axios.post(`${process.env.REACT_APP_API_URL}case`, { id }).then(() => {
			dispatch(
				handleConfirmModal(
					"저장이 완료되었습니다",
					0,
					"보관함으로 이동하시겠습니까?"
				)
			);
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
				className="content"
				overlayClassName="overlay"
				onRequestClose={modalHandler}
				ariaHideApp={false}
			>
				<ReviewModal
					dataId={data.id}
					data1={data}
					modalHandler={modalHandler}
					toggleH={toggleH}
					postLike={postLike}
					scrapCase={scrapCase}
				/>
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
