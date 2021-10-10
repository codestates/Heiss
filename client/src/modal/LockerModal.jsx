import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

axios.defaults.withCredentials = true;

const LockerModalSection = styled.div`
	background-color: #ccc;
	display: flex;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
	}

	.picDiv {
		width: 50%;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		@media ${(props) => props.theme.tablet} {
			height: 50%;
			width: 100%;
		}
		.reviewImg {
			transition: transform 0.5s;
		}
	}

	@media ${(props) => props.theme.tablet} {
		align-items: center;

		img {
			width: 60%;
			height: 70%;
		}
	}

	@media ${(props) => props.theme.mobileL} {
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			margin-bottom: 1rem;
		}
	}
`;

const lockerModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 4,
	},
};

const LockerModal = ({ modalHandler }) => {
	const [modal, setModal] = useState();

	return (
		<LockerModalSection>
			<Modal
				isOpen={modal}
				style={lockerModal}
				onRequestClose={() => {
					modalHandler();
				}}
				ariaHideApp={false}
			/>
		</LockerModalSection>
	);
};

export default LockerModal;
