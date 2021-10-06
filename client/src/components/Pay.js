import React, { useRef, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({
	customCaseId,
	quantity,
	address,
	price,
	name,
}) {
	const initialOptions = {
		"client-id":
			"AeX48zJnXWHzUAB5PrbJa9l8HfNHcq1Udfc2O-tlA_VYYyCABgSxrZrmMA_jV27JN79YGQAzUe9ydVWL",
		currency: "CAD",
	};

	const create = {
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
	};

	const onApprove = async (data, actions) => {
		console.log("실행");
		const order = await actions.order.capture();
		//서버에 물건정보, 유저정보 전송
		const url = process.env.REACT_APP_API_URL + "order";
		axios
			.post(url, { customCaseId, quantity })
			.then((response) => console.log("여기야", response));
		console.log(order);
	};

	return (
		<PayPalScriptProvider options={initialOptions}>
			<PayPalButtons
				create={create}
				onApprove={onApprove}
				onError={(err) => console.log(err)}
			/>
		</PayPalScriptProvider>
	);
}
//paypal 결제용 sandbox 아이디
//sb-r3dse7820898@personal.example.com

//비밀번호
//IEbnz4e>
