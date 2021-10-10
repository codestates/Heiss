import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserCart } from "../redux/modules/users";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";
import axios from "axios";
import CartList from "./CartList";
import Pay from "./Pay";
import { useDispatch, useSelector } from "react-redux";

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
		@media ${(props) => props.theme.tablet} {
			font-size: 1rem;
		}
		@media (max-width: 430px) {
			text-align: center;
		}
	}

	.plus {
		font-size: 3rem;
		color: ${color.point};
	}

	.all_money {
		font-size: 3rem;
		color: ${color.point};
		@media ${(props) => props.theme.tablet} {
			font-size: 2rem;
		}
		@media (max-width: 430px) {
			font-size: 1.5rem;
		}
	}

	.allPrice {
		font-size: 1.5rem;
		margin-bottom: 0.8rem;
		font-weight: bold;
		@media (max-width: 430px) {
			font-size: 1.2rem;
			margin-bottom: 2rem;
		}
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
		@media ${(props) => props.theme.tablet} {
			&::placeholder {
				font-size: 1rem;
			}
		}
	}

	div {
		font-size: 1.5rem;
		width: 50%;
	}
`;

const Cart = ({ name }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	// 총 배송비
	const [delivery, setDelivery] = useState(2000);
	// 총 구매값
	const [money, setMoney] = useState(0);
	// 주소 창
	const [address, setAddress] = useState(true);
	// 주소 내용
	const [addressName, setAddressName] = useState("");
	const [orders, setOrders] = useState(user.userCart);

	useEffect(() => {
		dispatch(getUserCart());
		console.log(user.userCart);
	}, []);

	useEffect(() => {
		if (user.userCart) {
			console.log("실행!");
			let arr = [];
			for (let el of user.userCart) {
				let payload = {
					customCaseId: el.customCase.id,
					quantity: el.quantity,
				};
				arr.push(payload);
			}
			setOrders(arr);
		}
	}, [user.userCart]);

	// 가격변경 핸들러
	const changeHandler = (moneys, data, toggle) => {
		// 같은 아이디 가격 값을 변경, 같은 아이디가 없다면 새롭게 추가
		// 체크가 풀렸을때 배열에서 해당 아이디 객체를 삭제
		setMoney((money) => {
			return money + moneys;
		});

		let quantity = data.quantity;
		let customCaseId = data.customCase.id;
		let payload = { quantity, customCaseId };

		//장바구니에서 체크된 상태의 아이템만 orders에 옮기는 코드
		//수량을 변경할때는 toggle인자에 변경할 숫자가 들어옴
		//orders에 들어있는 customCaseId를 찾아서 수량변경.
		if (toggle === true) {
			setOrders(orders.filter((el) => el.customCaseId !== customCaseId));
		} else if (typeof toggle === "number") {
			let copyArr = orders.slice();
			for (let i = 0; i < copyArr.length; i++) {
				if (copyArr[i].customCaseId === customCaseId) {
					copyArr[i].quantity = toggle;
					setOrders([...copyArr]);
					break;
				}
			}
		} else {
			setOrders([...orders, payload]);
		}
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

	return (
		<CartSection>
			{user.userCart.map((data, el) => (
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
					<p className="allPrice">총 구매 금액</p>
					<h3>총 상품 금액 {money}원</h3>
					<h3 className="plus">+</h3>
					<h3>총 배송비 {money === 0 ? 0 : delivery}원</h3>
					<h1 className="all_money">{money === 0 ? 0 : money + delivery}원</h1>
				</MoneyBox>
			</OrderBox>
			<Pay
				orders={orders}
				address={addressName}
				price={money + delivery}
				name={name}
			/>
		</CartSection>
	);
};

export default Cart;
