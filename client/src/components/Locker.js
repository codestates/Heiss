import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { onCanvasData } from "../redux/modules/review";
import { getUserCart } from "../redux/modules/users";
import LockerModal from "../modal/LockerModal";
import axios from "axios";

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
import sad from "../img/sad.svg";

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

const NonData = styled.div`
	${flexCenter}
	width: 100%;
`;

const Locker = ({ data, getMyCase }) => {
	const [modal, setModal] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	const modalHandler = () => {
		setModal(!modal);
	};

	// locker 삭제 핸들러
	const onDelHandler = () => {
		if (window.confirm("삭제하시겠습니까?")) {
			axios
				.delete(`${process.env.REACT_APP_API_URL}locker/${data.id}`)
				.then(() => {
					getMyCase();
					alert("삭제되었습니다.");
				});
		}
	};

	// 장바구니 추가 핸들러
	const onShopHandler = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}cart`, { caseId: data.id })
			.then((el) => {
				if (el.data.message === "conflict") {
					alert("이미 장바구니에 있는 제품입니다.");
				}
				dispatch(getUserCart());
			});
	};

	// 역직렬화 핸들러
	const patchData = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}case/${data.id}`)
			.then((el) => {
				dispatch(onCanvasData(el.data.data));
			})
			.then(() => {
				history.push("/make");
			});
	};

	if (!data) {
		return (
			<NonData>
				<h1>보관함이 비었어요..</h1>
				<img src={sad} alt="sad" style={{ width: "10rem" }} />
			</NonData>
		);
	}

	return (
		<LockerAllBox>
			<Modal
				isOpen={modal}
				style={ThumbnailModal}
				onRequestClose={modalHandler}
				ariaHideApp={false}
			>
				<img src={data.img} alt="img" />
				<LockerModal dataId={data.id} onClick={modalHandler} />
			</Modal>
			<ThumbnailSection>
				<img src={data.img} alt="img" />
				<HoverThumb className="hover-thumb">
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
