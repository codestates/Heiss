import React, { useState } from "react";
import styled from "styled-components";
import config from "../config";
import axios from "axios";

const WriteSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	input {
		width: 30rem;
		margin-top: 1.5rem;
		border-radius: 1vh;
		&::placeholder {
			color: white;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 10rem;
			font-size: 0.9rem;
			&::placeholder {
				font-size: 0.9rem;
			}
		}

		@media ${(props) => props.theme.tablet} {
			width: 25rem;
		}
	}

	button {
		border: 3px solid #f47676;
		width: 12rem;
		height: 3rem;
		color: #f47676;
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 2rem;
		transition: all 0.3s;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
	}
`;

const ReviewWriteModal = () => {
	const [value, setValue] = useState("");

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValue("");
	};

	axios.post(
		`${config.serverUrl}review`,
		{ desc: "asdf" },
		{
			withCredentials: true,
		}
	);

	return (
		<WriteSection>
			<img
				src="https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg"
				alt="img"
			/>
			<input
				placeholder="남기실 리뷰글을 적어주세요"
				value={value}
				onChange={onChange}
			/>
			<button onClick={onSubmit}>저장</button>
		</WriteSection>
	);
};

export default ReviewWriteModal;
