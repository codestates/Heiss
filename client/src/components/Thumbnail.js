import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import ReviewModal from "../modal/ReviewModal";

import heartIcon from "../img/heart.svg";
import noneheartIcon from "../img/noneheart.svg";

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
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(128, 128, 128, 0.5);
	border-radius: 2vh;

	img {
		height: 2rem;
		margin: 1rem;
		margin-left: 10rem;
	}
`;

const HeartHowMany = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-top: 1px;
	margin-left: 1rem;

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
		width: "70vw",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const Thumbnail = ({ data, key }) => {
	const [boo, setBoo] = useState(false);
	const [toggleH, setToggleH] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};

	return (
		<ThumbnailAllBox>
			<ThumbnailSection onClick={reverseBoo}>
				<Modal
					isOpen={boo}
					style={ThumbnailModal}
					onRequestClose={() => reverseBoo()}
					ariaHideApp={false}
				>
					<ReviewModal data={data} />
				</Modal>
				<img src={data} key={key} alt="img" />
				<HoverThumb className="hover-thumb">
					{toggleH ? (
						<img
							src={heartIcon}
							alt="heartIcon"
							onClick={() => setToggleH(!toggleH)}
						/>
					) : (
						<img
							src={noneheartIcon}
							alt="noneheartIcon"
							onClick={() => setToggleH(!toggleH)}
						/>
					)}
				</HoverThumb>
			</ThumbnailSection>
			<HeartHowMany>
				<div>996</div>
				<img src={heartIcon} alt="heartIcon" />
			</HeartHowMany>
		</ThumbnailAllBox>
	);
};

export default Thumbnail;
