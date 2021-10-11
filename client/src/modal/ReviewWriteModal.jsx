import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { StarTwoTone } from "@ant-design/icons";
import { handleRevieWritewModal } from "../redux/modules/review";
import {
	getUserLocker,
	getUserOrder,
	handleAlertModal,
} from "../redux/modules/users";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;

	.Wrap_1 {
		width: 100%;
		height: 90%;
	}

	.wrap_2 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.picWrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 80%;
		text-align: center;

		.imgWrap {
			position: relative;
			display: inline-block;
			border: 4px solid #f47676;
			border-radius: 0.5vh;
			width: 100%;
			height: 24%;
		}
	}

	.star {
		font-size: 30px;
		padding: 0rem 0.2rem;
		margin-bottom: 0.7rem;
	}

	.starCaseDiv {
		width: 100%;
	}

	@media (max-width: 1585px) {
		.starCaseDiv {
			display: block;
		}
		.star {
			margin-bottom: 0.5rem;
		}
	}

	@media (max-width: 510px) {
		flex-direction: column;
		.Wrap_1 {
			height: 40%;
		}
		.Wrap_2 {
			width: 100%;
			height: 20%;
		}
		.picWrap {
			width: 100%;
			height: 100%;
		}
	}
`;

const ReviewImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: scale-down;
	&:hover {
		+ div {
			display: block;
		}
	}

	.test {
		width: 50%;
	}
`;

const WriteSection = styled.form`
	width: 100%;
	height: 100%;
	position: relative;
	input {
		width: 85%;
		height: 18%;
		margin-top: 1.5rem;
		border-radius: 1vh;
		&::placeholder {
			color: #737373;
		}
	}

	textarea {
		background-color: #000;
		color: #f47676;
		resize: none;
		width: 89%;
		height: 50%;
		margin-top: 1.5rem;
		border-radius: 1vh;
		border: 3px solid #f47676;
		padding: 0.4rem 0rem 0rem 0.4rem;
		font-size: 1.2rem;
		font-weight: bold;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 10rem;
		font-size: 0.9rem;
		&::placeholder {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 510px) {
		display: flex;
	}

	@media (max-width: 424px) {
		width: 100%;
	}
`;

const FormRight = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 100%;
	height: 100%;
	input {
		width: 85%;
		height: 5%;
		border-radius: 1vh;
		&::placeholder {
			color: #737373;
		}
	}
	textarea {
		background-color: #000;
		width: 89%;
		height: 100%;
		color: #f47676;
		resize: none;
		height: 40%;
		margin-top: 1.5rem;
		border-radius: 1vh;
		border: 3px solid #f47676;
		padding: 0.4rem 0rem 0rem 0.4rem;
		font-size: 1.2rem;
		font-weight: bold;
	}
	.submit {
		display: flex;
		justify-content: center;
		margin-right: 8%;
	}

	@media (max-width: 510px) {
		width: 100%;
		height: 100%;
		input {
			width: 92%;
		}
		textarea {
			width: 97%;
		}
	}
`;

const ReviewBtn = styled.button`
	background-color: #f47676;
	color: #ffffe7;
	width: 12rem;
	height: 3rem;
	font-size: 1.5rem;
	font-weight: bold;
	margin-top: 2rem;
	transition: all 0.3s;

	&:hover {
		background: #ffffe7;
		color: #f47676;
	}
`;

const ImgDiv = styled.div`
	position: relative;
	border: 4px dashed #f47676;
	width: 80%;
	height: 110%;
	display: flex;
	align-items: center;
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
	> h3 {
		text-align: center;
		color: #f47676;
		padding: 1.4rem;
	}

	@media (max-width: 510px) {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 424px) {
		width: 100%;
	}
`;

const ChangeImg = styled.div`
	position: absolute;
	bottom: -12.5%;
	border: 3px dashed #f47676;
	margin-top: 0.6rem;
	width: 80%;
	height: 10%;
	border-radius: 0.5vh;
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
			font-size: 1.4rem;
			font-weight: bold;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			@media (max-width: 585px) {
				font-size: 1rem;
			}
		}
	}

	@media (max-width: 510px) {
		width: 35%;
		height: 19%;
		right: 1%;
		top: 101%;
	}
`;

const ImgDelete = styled.div`
	position: absolute;
	top: 8%;
	right: 8%;
	width: 3.8rem;
	height: 1.8rem;
	background-color: rgba(0, 0, 0, 0.6);
	border: 3px solid black;
	border-radius: 5px;
	display: none;
	> p {
		color: #fff;
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
		padding-top: 0.2rem;
		cursor: pointer;
	}
	&:hover {
		display: block;
	}
`;

const Select = styled.div`
	position: relative;
	padding: 0.4rem 0.8rem;
	width: 13rem;
	height: 1.2rem;
	border-radius: 0.4rem;
	border: 1px solid salmon;
	background-color: linen;
	background-image: url("https://img.icons8.com/material-rounded/24/000000/expand-arrow.png");
	background-repeat: no-repeat;
	background-position: 96% center;
	cursor: pointer;

	> ul {
		position: absolute;
		z-index: 1;
		top: 2rem;
		left: 0;
		width: 100%;
		border: 1px solid salmon;
		border-radius: 0.4rem;
		background-color: #f19494;
		cursor: pointer;
		> li {
			padding: 0.3rem;
		}
	}
`;

const ReviewWriteModal = ({ data, modalHandler }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [review, setReview] = useState({
		caseId: 0, // 나중에 0으로 변경
		title: "",
		desc: "",
		score: 0,
	});
	const [reviewImg, setReviewImg] = useState([]);
	const [deleteImg, setDeleteImg] = useState([]);
	const [caseChoice, setCaseChoice] = useState(false);
	const [orderCase, setOrderCase] = useState([]);
	const [caseName, setCaseName] = useState("케이스를 선택해 주세요.");
	const [color, setColor] = useState([
		"white",
		"white",
		"white",
		"white",
		"white",
	]);
	const [putColor, setPutColor] = useState([
		"white",
		"white",
		"white",
		"white",
		"white",
	]);

	useEffect(() => {
		if (reviewImg.length) {
			let pic = document.querySelectorAll(".imgWrap");
			for (let i = 0; i < reviewImg.length; i++) {
				if (reviewImg.length === 1) {
					pic[i].style.height = "100%";
				} else if (reviewImg.length === 2) {
					pic[i].style.height = "49%";
				} else if (reviewImg.length === 3) {
					pic[i].style.height = "32%";
				} else if (reviewImg.length === 4) {
					pic[i].style.height = "24%";
				}
			}
		}
	}, [reviewImg]);

	useEffect(() => {
		dispatch(getUserOrder());
	}, []);

	useEffect(() => {
		let arr = [];
		if (user.userOrder) {
			user.userOrder.forEach((item) => {
				item.orderList.forEach((el) => {
					arr.push(el);
				});
			});
			setOrderCase(arr);
		}
	}, [user.userOrder]);

	useEffect(() => {
		if (data) {
			setReview({
				caseId: data.customCase.id,
				title: data.title,
				desc: data.desc,
				score: data.score,
			});
			putColorChange(data.score - 1);
			for (let img of data.sources) {
				setReviewImg((e) => {
					return [
						...e,
						{
							imagePreviewUrl: img.imgUrl,
						},
					];
				});
			}
		}
		dispatch(getUserLocker());
	}, []);

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
		
		if (review.title && review.desc && review.score && review.caseId) {
			axios
				.post(`${process.env.REACT_APP_API_URL}review`, formData, {
					header: { "Content-Type": "multipart/form-data" },
				})
				.then(() => {
					dispatch(handleAlertModal("리뷰작성이 완료되었습니다"));
				});
		} else {
			dispatch(handleAlertModal("사진을 제외한 모든 항목을 입력해주세요"));
		}
	};

	const patchReviewUpload = (id) => {
		const formData = new FormData();
		for (let img of reviewImg) {
			formData.append("picture", img.file);
		}
		for (let re in review) {
			formData.append(re, review[re]);
		}
		if (deleteImg.length) {
			formData.append("deleteUrl", deleteImg);
		}
		if (review.title && review.desc && review.score && review.caseId) {
			axios
				.patch(`${process.env.REACT_APP_API_URL}review/${id}`, formData, {
					header: { "Content-Type": "multipart/form-data" },
				})
				.then(() => {
					dispatch(handleAlertModal("리뷰수정이 완료되었습니다"));
					dispatch(handleRevieWritewModal());
					modalHandler();
				});
		} else {
			dispatch(handleAlertModal("사진을 제외한 모든 항목을 입력해주세요"));
		}
	};

	const uploadImg = (e) => {
		if (e.target.files.length + reviewImg.length > 4) {
			return dispatch(handleAlertModal("사진은 4장까지 올릴 수 있습니다"));
		}
		for (let i = 0; i < e.target.files.length; i++) {
			imageLoader(e.target.files[i]);
		}
	};

	const imageLoader = (file) => {
		let reader = new FileReader();
		reader.onload = (ee) => {
			setReviewImg((state) => {
				return [
					...state,
					{
						file,
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
		setPutColor(arr);
		setReview({ ...review, score: index + 1 });
	};

	const putColorChange = (index) => {
		let arr = ["white", "white", "white", "white", "white"];
		for (let i = 0; i <= index; i++) {
			arr[i] = "yellow";
		}
		setPutColor(arr);
	};

	const caseHandler = () => {
		setCaseChoice(!caseChoice);
	};

	const imgDelete = (index, url) => {
		let newReviewImg = reviewImg.slice();
		newReviewImg.splice(index, 1);
		setReviewImg(newReviewImg);
		setDeleteImg([...deleteImg, url]);
	};

	const imgNameChange = (e, el) => {
		setCaseName(el.phone_type);
		setCaseChoice(false);
		setReview({ ...review, caseId: el.customCaseId });
		e.stopPropagation();
	};

	const liNameChange = (e, el) => {
		setCaseName(el.phone_type);
		setReview({ ...review, caseId: el.customCaseId });
	};

	return (
		<>
			<Wrap>
				<div className="Wrap_1">
					<WriteSection
						onSubmit={(e) => e.preventDefault()}
						enctype="multipart/form-data"
						method="post"
					>
						{reviewImg.length ? (
							<>
								<div className="picWrap">
									{reviewImg.map((el, index) => {
										
										return (
											<div className="imgWrap" key={index}>
												<ReviewImg src={el.imagePreviewUrl} />
												<ImgDelete
													onClick={() => imgDelete(index, el.imagePreviewUrl)}
												>
													<p>삭제</p>
												</ImgDelete>
											</div>
										);
									})}
								</div>
								<ChangeImg>
									<input
										type="file"
										multiple="multiple"
										name="filename"
										accept="image/*"
										onChange={(e) => uploadImg(e)}
									/>
									<div>
										<p>사진 추가</p>
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
								<h3>드래그나 클릭을 통해 케이스 사진을 올려주세요!</h3>
							</ImgDiv>
						)}
					</WriteSection>
				</div>
				<div className="wrap_2">
					<FormRight onSubmit={(e) => e.preventDefault()}>
						<div className="starCaseDiv">
							<div>
								{review.title.length
									? putColor.map((el, index) => (
											<StarTwoTone
												className="star"
												key={index}
												twoToneColor={el}
												onClick={() => colorChange(index)}
											/>
									  ))
									: color.map((el, index) => (
											<StarTwoTone
												className="star"
												key={index}
												twoToneColor={el}
												onClick={() => colorChange(index)}
											/>
									  ))}
							</div>
							{data ? null : (
								<Select onClick={caseHandler}>
									<span>{caseName}</span>
									{caseChoice ? (
										<ul>
											{orderCase.length ? (
												orderCase.map((el) => {
													
													return (
														<li
															key={el.id}
															onClick={(e) => liNameChange(e, el)}
														>
															<img
																onClick={(e) => imgNameChange(e, el)}
																style={{ width: "100px" }}
																src={el.img}
															/>
														</li>
													);
												})
											) : (
												<li>구매한 케이스가 없습니다</li>
											)}
										</ul>
									) : null}
								</Select>
							)}
						</div>
						<input
							placeholder="제목"
							value={review.title}
							onChange={(e) => onChange(e, "title")}
						/>
						<textarea
							placeholder="내용"
							value={review.desc}
							onChange={(e) => onChange(e, "desc")}
						/>
						<div className="submit">
							{!data ? (
								<ReviewBtn onClick={reviewUpload}>작성 완료</ReviewBtn>
							) : (
								<ReviewBtn onClick={() => patchReviewUpload(data.id)}>
									수정 완료
								</ReviewBtn>
							)}
						</div>
					</FormRight>
				</div>
			</Wrap>
		</>
	);
};

export default ReviewWriteModal;
