import React from "react";
import styled from "styled-components";

const WriteSection = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	input {
		width: 30rem;
		margin-top: 1.5rem;
		&::placeholder {
			color: white;
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
			background: #ffffe7;
		}
	}
`;

const ReviewWriteModal = () => {
	return (
		<WriteSection>
			<img
				src="https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg"
				alt="img"
			/>
			<input placeholder="남기실 리뷰글을 적어주세요" />
			<button>저장</button>
		</WriteSection>
	);
};

export default ReviewWriteModal;
