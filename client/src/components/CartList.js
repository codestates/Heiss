import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { getUserCart } from "../redux/modules/users";
import axios from "axios";
import {
	flexCenter,
	ThumbnailSections,
	color,
	HoverThumbs,
	BgnHovers,
	nonHoverButton,
} from "./utils/theme";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

const CartBox = styled.div`
	${flexCenter}
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
	border-bottom: 0.5px solid ${color.lightBasic};
	padding: 1rem;

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
	}

	.sub_title {
		font-size: 2rem;
	}

	.number {
		border: 1px double ${color.point};
		border-radius: 1.5vh;
		width: 3rem;
		height: 0.8rem;
	}

	.choice {
		height: 2rem;
		border: 1px solid ${color.point};
	}

	input[type="checkbox"] {
		display: none;
	}
	input[type="checkbox"] + label span {
		display: inline-block;
		width: 2.1rem;
		height: 2.1rem;
		margin: -2px 10px 0 0;
		border-radius: 1vh;
		vertical-align: middle;
		background: ${color.white};
		cursor: pointer;
	}
	input[type="checkbox"]:checked + label span {
		background-image: url("data:image/svg+xml,%3Csvg width='45' height='23' viewBox='0 0 84 62' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.1644 54.5114L77 7.67574' stroke='%23F47676' stroke-width='9.50867' stroke-linecap='square'/%3E%3Cpath d='M28.3821 52.7236L6.74856 31.0901' stroke='%23F47676' stroke-width='9.50867' stroke-linecap='square'/%3E%3C/svg%3E%0A");
		background-repeat: no-repeat;
		background-position: center center;
	}
`;

const ThumbnailSection = styled.div`
	${ThumbnailSections}
	min-height: 250px;
	height: 250px;
	min-width: 170px;
	width: 170px;
`;

const HoverThumb = styled.div`
	${HoverThumbs}
`;

const BgnHover = styled.div`
	${BgnHovers}
	${flexCenter}

	align-items: flex-end;

	button {
		margin: 1rem;
		${nonHoverButton}
	}
`;

const CartList = ({ data, copyKey, num, changeHandler }) => {
	const dispatch = useDispatch();
	// 수량
	const [quantity, setQuantity] = useState(data.quantity);
	// 체크박스
	const [toggle, setToggle] = useState(true);

	const onClickHandler = () => {
		// 체크해제되면 수량 가격 초기화
		if (toggle) {
			changeHandler(-quantity * data.customCase.price, data, toggle);
		} else {
			changeHandler(quantity * data.customCase.price, data, toggle);
		}
		setToggle(!toggle);
	};

	useEffect(() => {
		changeHandler(data.customCase.price * data.quantity, data, toggle);
	}, []);

	// number 바뀔때마다 최신화 시켜줄 핸들러
	const countHandler = (e, caseId) => {
		const number = Number(e.target.value);
		axios.patch(`${process.env.REACT_APP_API_URL}cart`, {
			quantity: number,
			caseId,
		});
		// 체크되있을때만 총 가격을 보내줌
		if (toggle) {
			if (quantity < number) {
				// up
				const plus = number - quantity;
				changeHandler(plus * data.customCase.price, data, number);
			} else if (quantity > number) {
				// down
				const minus = number - quantity;
				changeHandler(minus * data.customCase.price, data, number);
			} else {
				changeHandler(number * data.customCase.price, data, number);
			}
		}
		setQuantity(e.target.value);
	};

	// 장바구니 삭제 핸들러
	const deleteHandler = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}cart/${data.customCase.id}`)
			.then(() => {
				dispatch(getUserCart());
				if (toggle) {
					changeHandler(-data.customCase.price * data.quantity, data, true);
				} else {
					changeHandler(0, data, true);
				}
			});
	};

	return (
		<CartBox key={copyKey}>
			<ThumbnailSection>
				<img src={data.customCase.img} alt="img" />
				<HoverThumb className="hover-thumb">
					<BgnHover>
						<button onClick={deleteHandler}>삭제</button>
					</BgnHover>
				</HoverThumb>
			</ThumbnailSection>
			{/* <div className="column">
				<h2 className="sub_title">기종</h2>
				<h2>{data.customCase.phone.type}</h2>
			</div> */}
			<div className="column">
				<h2 className="sub_title">가격</h2>
				<h2>{data.customCase.price}원</h2>
			</div>
			{/* <div className="column">
				<h2 className="sub_title">배송비</h2>
				<h2>2000원</h2>
			</div> */}
			<div className="column">
				<h2 className="sub_title">수량</h2>
				<input
					type="number"
					value={quantity}
					className="number"
					onChange={(e) => countHandler(e, data.customCase.id)}
					min="1"
				/>
			</div>
			<div className="column">
				<input
					type="checkbox"
					className="choice"
					id={`c${num}`}
					value={toggle}
					onClick={onClickHandler}
					defaultChecked={toggle}
				/>
				<label htmlFor={`c${num}`}>
					<span></span>
				</label>
			</div>
		</CartBox>
	);
};

export default CartList;
