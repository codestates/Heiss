import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { lockerDatas } from "../redux/modules/review";
import LockerModal from "../modal/LockerModal";

import {
	ThumbnailSections,
	HoverThumbs,
	BgnHovers,
	flexCenter,
	color,
} from "./utils/theme";

// 이미지
import cartIcon from "../img/cart.svg";
import deleteIcon from "../img/delete.svg";
import axios from "axios";

const LockerAllBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ThumbnailSection = styled.div`
	${ThumbnailSections}
`;

const HoverThumb = styled.div`
	${HoverThumbs}

	.delete {
		height: 3rem;
		margin-left: 5.1rem;
		z-index: 1;
		&:hover {
			transform: scale(1.06);
		}
	}

	.bottom-hover {
		${flexCenter}
		justify-content: space-around;
		z-index: 1;
		margin-left: 1rem;
		margin-bottom: 1rem;

		button {
			${flexCenter}
			font-weight: bold;
			height: 2rem;
			background: ${color.point};
			color: ${color.white};
			width: 8rem;
			border: 4px solid ${color.point};
			border-radius: 1vh;
			transition: all 0.3s;
		}

		.cart {
			height: 2rem;
			margin-left: 4.9rem;
			z-index: 1;
			&:hover {
				transform: scale(1.06);
			}
		}
	}
`;

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

const BgnHover = styled.div`
	${BgnHovers}
`;

const Locker = ({ data, getMyCase }) => {
	const [modal, setModal] = useState(false);
	const [locker, setLocker] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();

	const modalHandler = () => {
		setModal(!modal);
	};

	useEffect(() => {
		console.log(data);
	}, []);

	// locker 삭제 핸들러
	const onDelHandler = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}locker/${data.id}`)
			.then(() => {
				getMyCase();
				alert("삭제되었습니다!");
			});
	};

	// 장바구니 추가 핸들러
	const onShopHandler = () => {
		console.log("잘작동");
		// axios.post(`${process.env.REACT_APP_API_URL}cart`, data.id);
	};

	// 역직렬화 핸들러
	const patchData = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}case/${data.id}`)
			.then((el) => {
				dispatch(lockerDatas(el.data.data));
			})
			.then(() => {
				history.push("/make");
			});
	};

	if (!data) {
		return null;
	}
	return (
		<LockerAllBox>
			<ThumbnailSection>
				<Modal
					isOpen={modal}
					onRequestClose={modalHandler}
					style={ThumbnailModal}
					ariaHideApp={false}
				>
					<LockerModal dataId={data.id} onClick={modalHandler} />
				</Modal>
				<img src={data.img} alt="img" />
				<HoverThumb className="hover-thumb" onClick={modalHandler}>
					<BgnHover onClick={modalHandler}></BgnHover>
					<img
						src={deleteIcon}
						alt="deleteIcon"
						className="delete"
						onClick={onDelHandler}
					/>
					<div className="bottom-hover">
						<button style={{ zIndex: "1" }} onClick={patchData}>
							수정
						</button>
						<img
							src={cartIcon}
							alt="cartIcon"
							className="cart"
							onClick={onShopHandler}
						/>
					</div>
				</HoverThumb>
			</ThumbnailSection>
		</LockerAllBox>
	);
};

export default Locker;
