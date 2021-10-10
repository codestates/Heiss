import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LeftCircleFilled } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import { StarTwoTone } from "@ant-design/icons";
import { handleRevieWritewModal } from "../redux/modules/review";
import { handleConfirmModal } from "../redux/modules/users";
import Modal from "react-modal";
import ReviewWriteModal from "../modal/ReviewWriteModal";
import { CloseCircleOutlined } from "@ant-design/icons";
import heartIcon from "../img/heart.svg";
import noneheartIcon from "../img/noneheart.svg";
axios.defaults.withCredentials = true;

const ReviewModalSection = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	.picDiv {
		width: 50%;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		@media ${(props) => props.theme.tablet} {
			height: 50%;
			width: 45%;
			position: absolute;
			top: 30%;
			left: 5%;
		}

		@media (max-width: 510px) {
			height: 43%;
			width: 80%;
			position: absolute;
			top: 24%;
			left: 10%;
		}

		.reviewImg {
			transition: transform 0.5s;
		}
		.carousel {
			position: absolute;
			top: 50%;
			transform: translate(0%, -50%);
			color: #ff5f5f;
			font-size: 2rem;
			cursor: pointer;
		}
		.right {
			right: 3%;
		}
		.left {
			left: 3%;
		}
		.hide {
			display: none;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
`;

const ReviewModalWrite = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 50%;
	margin-left: 1rem;
	color: #fd5d5d;
	color: #f49292;

	.close {
		display: none;
		font-size: 2rem;
		font-weight: bold;
		z-index: 100;
		position: absolute;
		top: 2%;
		right: 2%;
	}

	@media ${(props) => props.theme.laptopM} {
		.score {
			display: none;
		}
	}

	@media ${(props) => props.theme.tablet} {
		height: 20%;
		width: 100%;
	}

	.userDiv {
		position: relative;
		display: flex;
		width: 100%;
		height: 14%;
		border-bottom: 0.2rem solid #ffffe7;
		padding-bottom: 0.8rem;
		.imgDiv {
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			overflow: hidden;
			margin: 0rem 1rem;
			.profileImg {
				width: 100%;
				height: 100%;
			}
		}
	}
	.score {
		font-size: 1.7rem;
		font-weight: bold;
		margin-left: 0.5rem;
		color: yellow;
	}

	.name {
		font-size: 1.5rem;
		margin: 0.2rem 0rem 0rem 0.2rem;
		font-weight: bold;
	}

	.createdAt {
		position: relative;
		margin-left: 1.5rem;
		font-size: 1.1rem;
		color: #fe8888;
	}
	.createdAt:before {
		position: absolute;
		top: -2px;
		left: -12px;
		display: inline-block;
		content: "";
		width: 0.1rem;
		height: 18px;
		background: #ffffe7;
	}

	.title {
		height: 6%;
		font-size: 1.5rem;
		font-weight: bold;
		margin-left: 1.5rem;
		text-align: center;
		color: #ffffe7;
		padding: 0.5rem;
	}

	.desc {
		padding: 0.8rem;
		height: 50%;
		font-size: 1.3em;
		margin-left: 1.5rem;
		white-space: pre-wrap;
		color: #ffffe7;
		border: 1px solid #bb6464;
		border-radius: 0.3rem;
	}
	.phone {
		position: absolute;
		left: 3%;
		right: 0%;
		margin-bottom: 2rem;
		top: 76%;
		color: #979797;
		font-weight: bold;
	}

	@media ${(props) => props.theme.tablet} {
		.userDiv {
			position: absolute;
			top: 5%;
			left: 0;
			height: 48%;
			.name {
				margin: 0rem;
			}
			.phone {
				position: absolute;
				left: 65%;
				top: 54%;
			}
		}
		.title {
			margin: 0%;
			position: absolute;
			top: 80%;
			width: 100%;
			text-align: center;
		}
		.desc {
			position: absolute;
			top: 145%;
			height: 262%;
			box-sizing: border-box;
			margin: 0;
			width: 44%;
			right: 2%;
		}
	}
	@media (max-width: 588px) {
		.phone {
			display: none;
		}
	}
	@media (max-width: 510px) {
		.desc {
			position: absolute;
			top: 350%;
			right: 6%;
			height: 262%;
			box-sizing: border-box;
			margin: 0;
			width: 91%;
			height: 90%;
		}
		.close {
			display: block;
		}
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: space-evenly;

	@media ${(props) => props.theme.tablet} {
		position: absolute;
		left: 0;
		width: 100%;
		height: 40%;
		bottom: -390%;
	}

	@media ${(props) => props.theme.mobileL} {
		position: absolute;
		left: 0;
		width: 100%;
		height: 25%;
		bottom: -390%;
	}

	@media (max-width: 510px) {
		position: absolute;
		left: 0;
		width: 100%;
		height: 25%;
		bottom: -390%;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		background: none;
		border: 3px solid #f47676;
		font-size: 1rem;
		width: 32%;
		height: 100%;
		margin-bottom: 1rem;
		border-radius: 2vh;
		line-height: 100%;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
		&:before {
			transition: all 0.3s;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 8rem;
			height: 2.5rem;
			font-size: 1rem;
		}
	}

	.putBtn {
		border: 3px solid #ffffe7;
		color: #ffffe7;
		&:hover {
			background: #ffffe7;
			color: #f47676;
		}
	}
`;

const ScrapLikeBox = styled.div`
	height: 5rem;
	position: relative;

	.heartNumber {
		position: absolute;
		height: 5rem;
		display: flex;
		left: 20%;
		.likeCount {
			margin-left: 0.8rem;
			line-height: 5rem;
			color: #f47676;
			font-size: 1.4rem;
		}
	}

	.reviewHeart {
		width: 2.6rem;
		height: 5rem;
		cursor: pointer;
	}

	.reviewShareBtn {
		font-weight: bold;
		height: 2.4rem;
		width: 4.4rem;
		border-radius: 1vh;
		transition: all 0.3s;
		background: #f47676;
		color: #ffffe7;
		position: absolute;
		top: 30%;
		right: 20%;
	}

	@media ${(props) => props.theme.tablet} {
		bottom: -410%;
		.heartNumber {
			left: 25%;
		}
		.reviewShareBtn {
			right: 25%;
		}
	}
	@media (max-width: 510px) {
		bottom: -425%;
		.heartNumber {
			left: 23%;
		}
		.reviewShareBtn {
			right: 23%;
		}
	}
`;

const ReviewModal = ({
	dataId,
	data1,
	modalHandler,
	postLike,
	toggleH,
	scrapCase,
}) => {
	const user = useSelector((state) => state.user);
	const review = useSelector((state) => state.review);
	const dispatch = useDispatch();
	const [data, setData] = useState();
	const [color, setColor] = useState([]);
	const [imgNumber, setImgNumber] = useState(1);
	const [imglength, setImgLength] = useState(1);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}review/${dataId}`).then((el) => {
			setData(el.data.data);
			setColor(colorChange(el.data.data.score - 1));
			setImgLength(el.data.data.sources.length);
		});
	}, []);

	const likeHandler = () => {
		axios.get(`${process.env.REACT_APP_API_URL}review/${dataId}`).then((el) => {
			setData(el.data.data);
		});
	};

	const reviewDelete = (id) => {
		dispatch(handleConfirmModal("정말로 삭제하시겠습니까?", id));
	};

	const colorChange = (index) => {
		let arr = ["white", "white", "white", "white", "white"];
		for (let i = 0; i <= index; i++) {
			arr[i] = "yellow";
		}
		return arr;
	};

	const leftImg = (imgNumber) => {
		if (imgNumber > 1) {
			setImgNumber(imgNumber - 1);
			const imgs = document.querySelectorAll(".reviewImg");
			imgs.forEach((img) => {
				img.style.transform = `translate(-${imgNumber - 2}00%)`;
			});
		}
	};

	const rightImg = (imgNumber) => {
		if (imgNumber < imglength) {
			setImgNumber(imgNumber + 1);
			const imgs = document.querySelectorAll(".reviewImg");
			imgs.forEach((img) => {
				img.style.transform = `translate(-${imgNumber}00%)`;
			});
		}
	};

	const handleEdit = () => {
		dispatch(handleRevieWritewModal());
	};

	const writerModalHandler = () => {
		dispatch(handleRevieWritewModal());
	};

	if (!data) {
		return null;
	}

	return (
		<ReviewModalSection>
			<Modal
				isOpen={review.reviewWriteModal}
				className="content"
				overlayClassName="overlay"
				onRequestClose={() => {
					writerModalHandler();
					modalHandler();
				}}
				ariaHideApp={false}
			>
				<ReviewWriteModal data={data} modalHandler={modalHandler} />
			</Modal>
			<div className="picDiv">
				{data.sources.map((el, index) => {
					return (
						<img className="reviewImg" key={index} src={el.imgUrl} alt="img" />
					);
				})}
				<LeftCircleFilled
					onClick={() => leftImg(imgNumber)}
					className={`carousel left ${imglength === 1 ? "hide" : ""}`}
				/>
				<RightCircleFilled
					onClick={() => rightImg(imgNumber)}
					className={`carousel right ${imglength === 1 ? "hide" : ""}`}
				/>
			</div>
			<ReviewModalWrite>
				<div className="userDiv">
					<div className="phone">기종: {data.customCase.phone.type}</div>
					<div className="imgDiv">
						<img className="profileImg" src={data.user.profileImg} />
					</div>
					<div className="etc">
						<div className="reviewScore">
							{color.map((el, index) => (
								<StarTwoTone
									key={index}
									twoToneColor={el}
									style={{ fontSize: "30px", padding: "0rem 0.2rem" }}
								/>
							))}
							<span className="score">{data.score}</span>
						</div>
						<div className="name">
							{data.user.username}
							<span className="createdAt">
								{data.createdAt.slice(2, 10).replaceAll("-", ".")}
							</span>
						</div>
					</div>
				</div>
				<div className="title">{data.title}</div>
				<div className="desc">{data.desc}</div>
				{data.user.id === user.userInfo.id ? (
					<BtnBox>
						<button className="btn" onClick={() => reviewDelete(data.id)}>
							리뷰 삭제
						</button>
						<button
							className="btn putBtn"
							onClick={() => {
								handleEdit();
							}}
						>
							리뷰 수정
						</button>
					</BtnBox>
				) : (
					<ScrapLikeBox>
						{toggleH ? (
							<div className="heartNumber">
								<img
									src={heartIcon}
									alt="heartIcon"
									onClick={() => {
										postLike();
										likeHandler();
									}}
									className="reviewHeart"
								/>
								<span className="likeCount">{data1.like}</span>
							</div>
						) : (
							<div className="heartNumber">
								<img
									src={noneheartIcon}
									alt="noneheartIcon"
									onClick={() => {
										postLike();
										likeHandler();
									}}
									className="reviewHeart"
								/>
								<p className="likeCount">{data1.like}</p>
							</div>
						)}
						<button
							className="reviewShareBtn"
							onClick={() => scrapCase(data.id)}
						>
							퍼가기
						</button>
					</ScrapLikeBox>
				)}
				<CloseCircleOutlined className="close" onClick={modalHandler} />
			</ReviewModalWrite>
		</ReviewModalSection>
	);
};

export default ReviewModal;
