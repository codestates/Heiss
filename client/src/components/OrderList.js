import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCenter, color } from "../components/utils/theme";
import axios from "axios";

const OrderListSection = styled.div`
	${flexCenter}
`;

const OrderListBox = styled.div`
	${flexCenter}
`;

const OrderList = () => {
	const [order, setOrder] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}order`)
			.then((res) => console.log(res));
	});

	return (
		<OrderListSection>
			{order.map((data) => (
				<OrderListBox>
					<div>주문번호: {data.orderNumber}</div>
					{data.orderList.map((item) => (
						<>
							<img />
							<div>
								<div>
									<div>
										<div>아이템번호</div>
										<div>{item.customCaseId}</div>
									</div>
									<div>
										<div>수량</div>
										<div>{item.quantity}</div>
									</div>
								</div>
								<div>
									<div>주문금액</div>
									<div></div>
								</div>
								<div>
									<div>진행상황</div>
									<div></div>
								</div>
							</div>
						</>
					))}
				</OrderListBox>
			))}
		</OrderListSection>
	);
};

export default OrderList;
