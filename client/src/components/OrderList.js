import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, color, ImgDivs } from "../components/utils/theme";
import { getUserOrder } from "../redux/modules/users";
import axios from "axios";

// 이미지
import cry from "../img/crying.png";
import { useDispatch, useSelector } from "react-redux";

const OrderListSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const OrderListBox = styled.div`
	flex-direction: column;
	width: 100%;
	margin-bottom: 1rem;

	h3 {
		width: 100%;
		margin: 1rem 0;
		border-bottom: 3px solid ${color.lightBasic};
	}
`;

const ListBox = styled.div`
	/* ${flexCenter} */

	flex-wrap: wrap;
	width: 100%;
	&:last-child {
		border: none;
	}

	img {
		height: 250px;
		width: 170px;
		border-radius: 2vh;
		margin-bottom: 2rem;
	}

	@media (max-width: 1410px) {
		display: block;
	}
`;

const ListSemiBox = styled.ul`
	display: flex;
	justify-content: space-around;
	margin: 1rem;

	@media ${(props) => props.theme.tablet} {
		${flexCenter}

		flex-direction: column;
	}

	.orderTitle {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0.5rem 0;
		color: #f9a1a1;

		@media ${(props) => props.theme.tablet} {
			font-size: 1.2rem;
		}
	}

	.orderDesc {
		font-size: 1.2rem;
		@media ${(props) => props.theme.tablet} {
			font-size: 1rem;
		}
	}

	li {
		${flexCenter}

		align-items: space-between;
		width: 200px;
		height: 200px;
		text-align: center;
		font-size: 1.5rem;
		padding: 1rem;

		@media ${(props) => props.theme.tablet} {
			font-size: 1rem;
			width: 100px;
			height: 40px;
			padding: 0;
		}
	}
`;

const OrderList = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserOrder());
	}, []);

	if (user.userOrder.length === 0) {
		return (
			<OrderListSection>
				<h1 style={{ marginTop: "3rem" }}>주문내역이 없습니다</h1>
				<img src={cry} alt="cry" style={{ width: "20rem" }} />
			</OrderListSection>
		);
	}

	return (
		<OrderListSection>
			{user.userOrder.map((data) => (
				<OrderListBox key={data.orderNumber}>
					<h3>주문번호: {data.orderNumber}</h3>
					{data.orderList.map((item) => (
						<ListBox key={item.customCaseId}>
							<ListSemiBox>
								<img src={item.img} alt={item.img} />
								<li>
									<div className="orderTitle">기종</div>
									<div className="orderDesc">{item.phone_type}</div>
								</li>
								<li>
									<div className="orderTitle">수량</div>
									<div className="orderDesc">{item.quantity}개</div>
								</li>
								<li>
									<div className="orderTitle">주문금액</div>
									<div className="orderDesc">{item.price}원</div>
								</li>
								<li>
									<div className="orderTitle">진행상황</div>
									<div className="orderDesc">{data.condition}</div>
								</li>
							</ListSemiBox>
						</ListBox>
					))}
				</OrderListBox>
			))}
		</OrderListSection>
	);
};

export default OrderList;
