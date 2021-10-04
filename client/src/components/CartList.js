import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";

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

const CartList = ({ data, copyKey, num, changeHandler }) => {
  // 가격
	const [item, setItem] = useState(data.price);
	// 수량
	const [count, setCount] = useState(1);
	// 체크박스
	const [toggle, setToggle] = useState(false);

	const onClickHandler = () => {
		// 체크해제되면 수량 가격 초기화
		if (toggle) {
			setCount(0);
			setItem(data.price);
			changeHandler(-count * data.price, -2000);
		} else {
			changeHandler(count * data.price, !toggle && 2000);
		}
		setToggle(!toggle);
	};

	// number 바뀔때마다 최신화 시켜줄 핸들러
	const countHandler = (e) => {
		const number = Number(e.target.value);
		console.log(count, number);
		// 체크되있을때만 총 가격을 보내줌
		if (toggle) {
			if (count < number) {
				// up
				const plus = number - count;
				console.log("plus", plus);
				changeHandler(plus * data.price, !toggle && 2000);
			} else if (count > number) {
				// down
				const minus = number - count;
				console.log("minus", minus);
				changeHandler(minus * data.price, !toggle && 2000);
			} else {
				changeHandler(number * data.price, !toggle && 2000);
			}
		}

		setCount(e.target.value);
		setItem(e.target.value * data.price);
	};

	return (
		<CartBox key={copyKey}>
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
				/>
				<label htmlFor={`c${num}`}>
					<span></span>
				</label>
			</div>
		</CartBox>
	);
};

export default CartList;
