import React, { useRef, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Paypal({ address, price, name, orders }) {
	let createOrderFn = (data, actions) => {
		return actions.order.create({
			intent: "CAPTURE",
			purchase_units: [
				{
					shipping: {
						name: {
							full_name: "ysm",
						},
						address: {
							address_line_1: "address",
							address_line_2: "given address 2",
							admin_area_2: "San Jose",
							admin_area_1: "CA",
							postal_code: "95131",
							country_code: "US",
						},
					},
					description: "my case",
					amount: {
						currency_code: "CAD",
						value: 1.0,
					},
				},
			],
		});
	};
	let onApproveFn = async (data, actions) => {
		const order = await actions.order.capture();
		//서버에 물건정보, 유저정보 전송
		const url = process.env.REACT_APP_API_URL + "order";
		axios.post(url, orders).then((response) => console.log("여기야", response));
		console.log(orders);
	};
	let options = {
		"client-id":
			"AeX48zJnXWHzUAB5PrbJa9l8HfNHcq1Udfc2O-tlA_VYYyCABgSxrZrmMA_jV27JN79YGQAzUe9ydVWL",
		currency: "CAD",
	};

	//forceReRender 속성은 useEffect의 종속배열과 같은 역할
	//orders가 변했을때 버튼을 재렌더링 시켜서 onApprove함수를 실행할때
	//orders의 값을 최신화
	//forceReRender속성을 넣지 않을 경우 기존처럼 [] 출력
	return (
		<div style={{ zIndex: 0 }}>
			<PayPalScriptProvider options={options}>
				<PayPalButtons
					forceReRender={[orders]}
					createOrder={createOrderFn}
					onApprove={onApproveFn}
					disabled={!orders.length}
					onError={(err) => {
						console.log(err);
					}}
				/>
			</PayPalScriptProvider>
		</div>
	);
}
//paypal 결제용 sandbox 아이디
//sb-r3dse7820898@personal.example.com

//비밀번호
//IEbnz4e>
