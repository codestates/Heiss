import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { StarTwoTone } from "@ant-design/icons";
import { reviewDatas } from "../redux/modules/review";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	.imgWrap {
		position: relative;
	}
`;

const WriteSection = styled.form`
	display: flex;
	flex-direction: column;

	input {
		width: 30rem;
		margin-top: 1.5rem;
		border-radius: 1vh;
		&::placeholder {
			color: #737373;
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
`;

const ReviewBtn = styled.button`
	position: absolute;
	top: 550px;
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
`;

const StyledTextarea = styled.textarea`
	background-color: #000;
	color: #f47676;
	resize: none;
	width: 31.4rem;
	height: 10rem;
	margin-top: 1.5rem;
	border-radius: 1vh;
	border: 3px solid #f47676;
	padding: 0.4rem 0rem 0rem 0.4rem;
	font-size: 1.2rem;
	font-weight: bold;
`;

const ImgDiv = styled.div`
	position: relative;
	border: 4px dashed #f47676;
	margin-top: 2rem;
	width: 31.4rem;
	height: 2.4rem;
	border-radius: 1vh;
	&:hover {
		background-color: #f7caca;
		border: 4px dashed #f47676;
	}

	> input {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
	> div {
		text-align: center;
		color: #f47676;
		top: rem;
		padding-top: 0.5rem;
	}
`;

const ChangeImg = styled.div`
	position: relative;
	border: 3px dashed #f47676;
	margin-top: 0.4rem;
	width: 6rem;
	height: 1.4rem;
	border-radius: 1vh;
	&:hover {
		background-color: #f7caca;
		border: 3px dashed #f47676;
	}

	> input {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
	> div {
		text-align: center;
		color: #f47676;
		padding-top: 0.2rem;
		> p {
			font-size: 1rem;
			font-weight: bold;
		}
	}
`;

const ImgDelete = styled.div`
	position: absolute;
	top: 2rem;
	left: 15.2rem;
	width: 3.6rem;
	height: 1.6rem;
	background-color: rgba(0, 0, 0, 0.6);
	border: 3px solid black;
	border-radius: 5px;
	color: #fff;
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	display: none;
	&:hover {
		display: block;
	}
`;

const ReviewImg = styled.img`
	margin-top: 1rem;
	width: 20rem;
	height: 15rem;
	&:hover {
		+ div {
			display: block;
		}
	}
`;

const Select = styled.div`
	position: relative;
	padding: 5px 10px;
	width: 200px;
	border-radius: 5px;
	border: 1px solid salmon;
	background-color: linen;
	background-image: url("https://img.icons8.com/material-rounded/24/000000/expand-arrow.png");
	background-repeat: no-repeat;
	background-position: 96% center;
	cursor: pointer;

	> ul {
		position: absolute;
		top: 30px;
		left: 0;
		width: 100%;
		border: 1px solid salmon;
		border-radius: 5px;
		background-color: #f19494;
		cursor: pointer;
		> li {
			padding: 0.3rem;
		}
	}
`;

const ReviewWriteModal = ({ closeModal }) => {
	const state = useSelector((state) => state.handleActions);
	const dispatch = useDispatch();

	const [review, setReview] = useState({
		userId: 5,
		caseId: 14,
		title: "",
		desc: "",
		score: 0,
	});
	const [reviewImg, setReviewImg] = useState([]);
	const [caseChoice, setCaseChoice] = useState(false);
	const [caseName, setCaseName] = useState("케이스를 선택해 주세요.");
	const [color, setColor] = useState([
		"white",
		"white",
		"white",
		"white",
		"white",
	]);

	const onChange = (e, key) => {
		setReview({ ...review, [key]: e.target.value });
	};

	const reviewUpload = () => {
		const formData = new FormData();
		for (let img of reviewImg) {
			formData.append("picture", img.file);
		}
		for (let re in review) {
			formData.append(re, review[re]);
		}
		if (review.title && review.desc && review.score) {
			axios
				.post(`${process.env.REACT_APP_API_URL}review`, formData, {
					header: { "Content-Type": "multipart/form-data" },
				})
				.then((el) => {
					alert("리뷰작성이 완료되었습니다.");
					dispatch(reviewDatas());
					closeModal(false);
				});
		}
	};

	const uploadImg = (e) => {
		for (let i = 0; i < e.target.files.length; i++) {
			imageLoader(e.target.files[i]);
		}
	};

	const imageLoader = (file) => {
		let reader = new FileReader();
		reader.onload = function (ee) {
			setReviewImg((state) => {
				return [
					...state,
					{
						file: file,
						imagePreviewUrl: ee.target.result,
					},
				];
			});
		};
		reader.readAsDataURL(file);
	};

	const colorChange = (index) => {
		let arr = ["white", "white", "white", "white", "white"];
		for (let i = 0; i <= index; i++) {
			arr[i] = "yellow";
		}
		setColor(arr);
		setReview({ ...review, score: index + 1 });
	};

	const caseHandler = () => {
		setCaseChoice(!caseChoice);
	};

	const imgDelete = (index) => {
		let newReviewImg = reviewImg.slice();
		newReviewImg.splice(index, 1);
		setReviewImg(newReviewImg);
	};

	const imgNameChange = (e) => {
		setCaseName(e.target.alt);
		setCaseChoice(false);
		e.stopPropagation();
	};

	const liNameChange = (e) => {
		setCaseName(e.target.children[0].alt);
	};

	return (
		<>
			<Wrap>
				<div>
					{color.map((el, index) => (
						<StarTwoTone
							key={index}
							twoToneColor={el}
							style={{ fontSize: "30px", padding: "0rem 0.2rem" }}
							onClick={() => colorChange(index)}
						/>
					))}
					<WriteSection
						onSubmit={(e) => e.preventDefault()}
						enctype="multipart/form-data"
						method="post"
					>
						{reviewImg.length ? (
							<>
								{reviewImg.map((el, index) => {
									return (
										<div className="imgWrap" key={index}>
											<ReviewImg src={el.imagePreviewUrl} />
											<ImgDelete onClick={() => imgDelete(index)}>
												삭제
											</ImgDelete>
										</div>
									);
								})}
								<ChangeImg>
									<input
										type="file"
										multiple="multiple"
										name="filename"
										accept="image/*"
										onChange={(e) => uploadImg(e)}
									/>
									<div>
										<p>사진추가</p>
									</div>
								</ChangeImg>
							</>
						) : (
							<ImgDiv>
								<input
									type="file"
									multiple="multiple"
									name="filename"
									accept="image/*"
									onChange={(e) => uploadImg(e)}
								/>
								<div>
									<h3>Drag and drop a file or select add Image</h3>
								</div>
							</ImgDiv>
						)}
					</WriteSection>
				</div>
				<div>
					<Select onClick={caseHandler}>
						<span>{caseName}</span>
						{caseChoice ? (
							<ul>
								{/* {cases.map((el) => {
									<li onClick={liNameChange}>
										<img
											onClick={imgNameChange}
											style={{ width: "100px" }}
											src={el.img}
											alt={el}
										/>
									</li>;
								})} */}
								<li onClick={liNameChange}>
									<img
										onClick={imgNameChange}
										style={{ width: "100px" }}
										src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-white-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343705000"
										alt="아이폰"
									/>
								</li>
								<li onClick={liNameChange}>
									<img
										onClick={imgNameChange}
										style={{ width: "100px" }}
										src="https://newsimg.sedaily.com/2021/01/08/22H6CMQYK3_3.jpg"
										alt="갤럭시"
									/>
								</li>
								<li onClick={liNameChange}>
									<img
										onClick={imgNameChange}
										style={{ width: "100px" }}
										src="https://images.kbench.com/kbench/article/2021_01/k217730p1n1.jpg"
										alt="접은갤럭시"
									/>
								</li>
							</ul>
						) : null}
					</Select>
					<WriteSection
						onSubmit={(e) => e.preventDefault()}
						enctype="multipart/form-data"
						method="post"
					>
						<input
							placeholder="제목"
							value={review.title}
							onChange={(e) => onChange(e, "title")}
						/>
						<StyledTextarea
							placeholder="내용"
							value={review.desc}
							onChange={(e) => onChange(e, "desc")}
						/>
					</WriteSection>
				</div>
			</Wrap>
			<ReviewBtn onClick={reviewUpload}>작성 완료</ReviewBtn>
		</>
	);
};

export default ReviewWriteModal;
