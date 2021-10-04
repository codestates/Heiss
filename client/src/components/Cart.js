import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";
import axios from "axios";
import CartList from "./CartList";
import Pay from "./Pay";

const CartSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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
	width: 40rem;
	height: 20rem;
	border: 1px solid ${color.white};
	margin-top: 5rem;
	padding: 2rem;
	margin-bottom: 1rem;

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
		height: 30rem;
		width: 20rem;
	}

	@media ${(props) => props.theme.mobileL} {
		height: 35rem;
		width: 13rem;
	}
`;

const MoneyBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	width: 50%;

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

const Shipping = styled.div`
	${flexCenter};
	flex-direction: column;

	h2 {
		margin-bottom: 1rem;
	}

	input {
		width: 13rem;
		border-radius: 2vh;
	}

	div {
		font-size: 1.5rem;
		width: 50%;
	}
`;

const Cart = ({ name }) => {
	// 총 배송비
	const [delivery, setDelivery] = useState(0);
	// 총 구매값
	const [money, setMoney] = useState(0);
	// 주소 창
	const [address, setAddress] = useState(true);
	// 주소 내용
	const [addressName, setAddressName] = useState("");
	// 나중에 초기값 []로 바꿀 예정
	const [cartArr, setCartArr] = useState([
		{
			img: "https://cdn.discordapp.com/attachments/884357003747688478/890774776128344104/unknown.png",
			price: 1000,
			id: 1,
			quantity: 1,
		},
		{
			img: "https://cdn.discordapp.com/attachments/884357003747688478/890774776128344104/unknown.png",
			price: 3000,
			id: 2,
			quantity: 1,
		},
	]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}cart`)
			.then((res) => setCartArr(res.data.data));
	}, []);

	// 가격변경 핸들러
	const changeHandler = (moneys, deliverys) => {
		// 같은 아이디 가격 값을 변경, 같은 아이디가 없다면 새롭게 추가
		// 체크가 풀렸을때 배열에서 해당 아이디 객체를 삭제
		console.log(deliverys);
		setMoney(money + moneys);
		setDelivery(delivery + deliverys);
	};

	// 주소
	const addressHandler = (e) => {
		setAddressName(e.target.value);
	};

	function enterkey() {
		if (window.event.keyCode === 13) {
			setAddress(!address);
		}
	}

	const customCaseId = cartArr.map((data) => data.id);
	const quantity = cartArr.map((data) => data.quantity);

	return (
		<CartSection>
			{cartArr.map((data, el) => (
				<CartList
					data={data}
					key={el}
					copyKey={el}
					num={el}
					changeHandler={changeHandler}
				/>
			))}
			<OrderBox>
				<Shipping>
					<h2>배송정보</h2>
					{address ? (
						<input
							placeholder="배송할 주소를 입력해주세요"
							onChange={addressHandler}
							onKeyUp={enterkey}
							value={addressName}
						/>
					) : (
						<div onClick={() => setAddress(!address)}>{addressName}</div>
					)}
				</Shipping>
				<MoneyBox>
					<h2>총 구매 금액</h2>
					<h3>총 상품 금액 {money}원</h3>
					<h3 className="plus">+</h3>
					<h3>총 배송비 {delivery}원</h3>
					<h1 className="all_money">{money + delivery}원</h1>
				</MoneyBox>
			</OrderBox>
			<Pay
				customCaseId={customCaseId}
				quantity={quantity}
				address={addressName}
				price={money + delivery}
				name={name}
			/>
		</CartSection>
	);
};

export default Cart;
