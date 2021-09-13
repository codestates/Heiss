import React, { useState } from "react";
import Modal from "react-modal";

const reviewModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 2,
	},
};

const Test = () => {
	const [boo, setBoo] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};
	return (
		<Modal
			isOpen={boo}
			style={reviewModal}
			onRequestClose={() => reverseBoo()}
			ariaHideApp={false}
		/>
	);
};

export default Test;
