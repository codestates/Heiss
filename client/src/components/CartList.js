import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";

const CartBox = styled.div`
	${flexCenter}
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;

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
		height: 0.5rem;
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
`;

const CartList = ({ data, key, num, changeHandler }) => {
	// 가격
	const [item, setItem] = useState(data.price);
	// 수량
	const [count, setCount] = useState(1);
	// 체크박스
	const [toggle, setToggle] = useState(false);

	const countHandler = (e) => {
		setCount(e.target.value);
		setItem(e.target.value * data.price);
	};

	const onClickHandler = (e) => {
		const money = count * data.price;
		const delivery = count ? 2000 : 0;
		changeHandler(delivery, money, e.target.value);
		setToggle(!toggle);
	};

	return (
		<CartBox>
			<ThumbnailSection>
				<img src={data.img} alt="img" />
			</ThumbnailSection>
			<div className="column">
				<h2 className="sub_title">가격</h2>
				<h2>{item}원</h2>
			</div>
			<div className="column">
				<h2 className="sub_title">배송비</h2>
				<h2>2000원</h2>
			</div>
			<div className="column">
				<h2 className="sub_title">수량</h2>
				<input
					type="number"
					value={count}
					className="number"
					onChange={countHandler}
					min="0"
				/>
			</div>
			<div className="column">
				<input
					type="checkbox"
					className="choice"
					id={`c${num}`}
					value={toggle}
					onClick={onClickHandler}
				/>
				<label htmlFor={`c${num}`}>
					<span></span>
				</label>
			</div>
		</CartBox>
	);
};

export default CartList;
