import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Paypal() {
	const paypal = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: "my case",
								amount: {
									currency_code: "CAD",
									value: 1.0,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					//서버에 물건정보, 유저정보 전송
					axios
						.post("http://localhost:80/cart/paypal")
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
		<div>
			<div ref={paypal}></div>
		</div>
	);
}
//paypal 결제용 sandbox 아이디
//sb-r3dse7820898@personal.example.com

//비밀번호
//IEbnz4e>
