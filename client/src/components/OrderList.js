import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, color } from "../components/utils/theme";
import axios from "axios";

// 이미지
import cry from "../img/crying.png";

const OrderListSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const OrderListBox = styled.div`
	${flexCenter}
	flex-direction: column;
	width: 100%;
	margin-bottom: 1rem;

	h1 {
		width: 100%;
		margin: 2rem 0;
		border-bottom: 3px solid ${color.lightBasic};
	}
`;

const ListBox = styled.div`
	${flexCenter}

	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 2rem;
	border-bottom: 0.5px solid ${color.lightBasic};
	&:last-child {
		border: none;
	}

	img {
		min-height: 250px;
		height: 250px;
		min-width: 170px;
		width: 170px;
		border-radius: 2vh;
		margin-bottom: 2rem;
	}

	.title {
		font-size: 2rem;
		margin: 0.5rem 0;
		color: ${color.point};
	}
`;

const ListSemiBox = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin: 1rem;

	li {
		${flexCenter}

		align-items: space-between;
		width: 150px;
		height: 150px;
		text-align: center;
		font-size: 1.5rem;
	}
`;

const OrderList = () => {
	const [order, setOrder] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}order`).then((res) => {
			console.log(res.data);
			setOrder(res.data);
		});
	}, []);

	if (order.length === 0) {
		return (
			<OrderListSection>
				<h1 style={{ marginTop: "3rem" }}>주문내역이 없습니다</h1>
				<img src={cry} alt="cry" style={{ width: "20rem" }} />
			</OrderListSection>
		);
	}

	return (
		<OrderListSection>
			{order.map((data) => (
				<OrderListBox>
					<h1>{data.length === 0 && "주문"}</h1>
					<h1>주문번호: {data.orderNumber}</h1>
					{data.orderList.map((item) => (
						<ListBox>
							<img src={item.img} alt={item.img} />
							<ListSemiBox>
								<li>
									<div className="title">아이템번호</div>
									<div>{item.customCaseId}</div>
								</li>
								<li>
									<div className="title">수량</div>
									<div>{item.quantity}개</div>
								</li>
								<li>
									<div className="title">주문금액</div>
									<div>{item.price}원</div>
								</li>
								<li>
									<div className="title">진행상황</div>
									<div>{item.condition}</div>
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
