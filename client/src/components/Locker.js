import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { onCanvasData } from "../redux/modules/review";
import "../css/lockerModal.css";
import {
	getUserCart,
	handleAlertModal,
	handleConfirmModal,
} from "../redux/modules/users";
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

const BgnHover = styled.div`
	${BgnHovers}
`;

const NonData = styled.div`
	${flexCenter}
	width: 100%;
`;

const Locker = ({ data }) => {
	const [modal, setModal] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	const modalHandler = () => {
		setModal(!modal);
	};

	// locker 삭제 핸들러
	const onDelHandler = () => {
		dispatch(handleConfirmModal("삭제하시겠습니까?", data.id));
	};

	// 장바구니 추가 핸들러
	const onShopHandler = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}cart`, { caseId: data.id })
			.then((el) => {
				if (el.data.message === "conflict") {
					dispatch(handleAlertModal("이미 장바구니에 있는 제품입니다"));
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
				className="lockerContent"
				overlayClassName="lockerOverlay"
				onRequestClose={modalHandler}
				ariaHideApp={false}
			>
				<img className="lockerImg" src={data.img} alt="img" />
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
