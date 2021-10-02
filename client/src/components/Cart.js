import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";
import axios from "axios";
import CartList from "./CartList";

const CartSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-wrap: wrap;
	height: 100%;

	.column {
		${flexCenter}
		flex-direction: column;
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;

		h2 {
			margin-bottom: 1rem;
		}
	}
`;

const OrderBox = styled.div`
	${flexCenter};
	justify-content: space-around;
	width: 40%;
	height: 15rem;
	border: 1px solid ${color.white};
	margin-top: 5rem;
	padding: 2rem;
`;

const MoneyBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;

	h1,
	h2 {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	h3 {
		margin-bottom: 0.5rem;
	}

	.plus {
		font-size: 3rem;
		color: ${color.point};
	}

	.all_money {
		font-size: 3rem;
		color: ${color.point};
	}
`;

const Cart = () => {
	// 총 배송비
	const [delivery, setDelivery] = useState(0);
	// 총 구매값
	const [money, setMoney] = useState(0);
	// 나중에 초기값 []로 바꿀 예정
	const [cartArr, setCartArr] = useState([
		{
			img: "https://cdn.discordapp.com/attachments/884357003747688478/890774776128344104/unknown.png",
			price: 1000,
		},
		{
			img: "https://cdn.discordapp.com/attachments/884357003747688478/890774776128344104/unknown.png",
			price: 3000,
		},
	]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}cart`)
			.then((res) => setCartArr(res));
	});

	const changeHandler = ({ deliverys, moneys, toggle }) => {
		setDelivery(toggle === "on" ? delivery + deliverys : delivery - deliverys);
		setMoney(toggle === "on" ? delivery + moneys : delivery - moneys);
		console.log(deliverys, moneys, toggle);
	};

	return (
		<CartSection>
			{cartArr.map((data, key) => (
				<CartList data={data} key={key} changeHandler={changeHandler} />
			))}
			<OrderBox>
				<div>
					<div>배송정보</div>
				</div>
				<MoneyBox>
					<h2>총 구매 금액</h2>
					<h3>총 상품 금액 {money}원</h3>
					<h3 className="plus">+</h3>
					<h3>총 배송비 {delivery}원</h3>
					<h1 className="all_money">{money + delivery}원</h1>
				</MoneyBox>
			</OrderBox>
		</CartSection>
	);
};

export default Cart;
