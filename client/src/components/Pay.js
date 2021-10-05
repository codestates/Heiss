import React, { useRef, useEffect, useSelector } from "react";
import axios from "axios";

export default function Paypal({
	customCaseId,
	quantity,
	address,
	price,
	name,
}) {
	const paypal = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								shipping: {
									name: {
										full_name: { name },
									},
									address: {
										address_line_1: { address },
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
									value: { price },
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					//서버에 물건정보, 유저정보 전송
					const url = process.env.REACT_APP_API_URL + "order";
					axios
						.post(url, { customCaseId, quantity })
						.then((response) => console.log(response));
					console.log(order);
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, []);
	return (
		<div style={{ zIndex: 0 }}>
			<div ref={paypal}></div>
		</div>
	);
}
//paypal 결제용 sandbox 아이디
//sb-r3dse7820898@personal.example.com

//비밀번호
//IEbnz4e>
