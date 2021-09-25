import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import reviewDatas from "../redux/modules/review";

const ReviewModalSection = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	img {
		width: 50%;
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

const ReviewModalWrite = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 50%;
	margin-left: 1rem;
	color: #ffffe7;

	.reviewWrite {
		font-size: 2rem;
		overflow: auto;

		@media ${(props) => props.theme.tablet} {
			font-size: 1.4rem;
		}
	}
`;

const BtnBox = styled.div`
	display: flex;

	@media ${(props) => props.theme.tablet} {
		margin-top: 15rem;
	}

	@media ${(props) => props.theme.mobileL} {
		margin-top: 10rem;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		background: none;
		border: 3px solid #f47676;
		font-size: 1.5rem;
		width: 11rem;
		height: 3rem;
		margin: 1rem;
		border-radius: 2vh;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
		&:before {
			transition: all 0.3s;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 8rem;
			height: 2.5rem;
			font-size: 1rem;
		}
	}

	.putBtn {
		border: 3px solid #ffffe7;
		color: #ffffe7;
		&:hover {
			background: #ffffe7;
			color: #f47676;
		}
	}

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
	}
`;

const ReviewModal = ({ dataId, reverseBoo }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		id: 29,
		score: 5,
		title: "",
		desc: "",
		sources: [],
	});

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}review/${dataId}`).then((el) => {
			console.log(el.data.data);
			setData(el.data.data);
		});
	}, []);

	const reviewDelete = (id) => {
		axios.delete(`${process.env.REACT_APP_API_URL}review/${id}`).then((el) => {
			alert("리뷰가 삭제되었습니다!");
			dispatch(reviewDatas());
			reverseBoo();
		});
	};

	return (
		<ReviewModalSection>
			{data.sources.map((el, index) => {
				return <img key={index} src={el.imgUrl} alt="img" />;
			})}
			<ReviewModalWrite>
				<div className="reviewWrite">{data.title}</div>
				<div className="reviewWrite">{data.desc}</div>
				<BtnBox>
					<button className="btn" onClick={() => reviewDelete(data.id)}>
						리뷰 삭제
					</button>
					<button className="btn putBtn">리뷰 수정</button>
				</BtnBox>
			</ReviewModalWrite>
		</ReviewModalSection>
	);
};

export default ReviewModal;
