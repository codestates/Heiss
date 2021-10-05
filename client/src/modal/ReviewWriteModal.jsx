import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { StarTwoTone } from "@ant-design/icons";
import { reviewDatas, handleRevieWritewModal } from "../redux/modules/review";
import { getUserLocker } from "../redux/modules/users";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	.Wrap_1 {
		width: 50%;
	}

	.picWrap {
		width: 80%;
		display: flex;

		.imgWrap {
			display: flex;
			border: 4px solid #f47676;
			border-radius: 0.5vh;
			outline: 0;
			position: relative;
			width: 100%;
			height: 18.6rem;
			overflow: hidden;
		}
	}

	.star {
		font-size: 30px;
		padding: 0rem 0.2rem;
	}

	.starCaseDiv {
		display: flex;
		justify-content: space-between;
	}
`;

const ReviewImg = styled.img`
	width: 100%;
	height: 100%;
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
	display: flex;
	flex-direction: column;
	position: relative;
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

	textarea {
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
	}
`;

const ReviewBtn = styled.button`
	position: absolute;
	top: 80%;
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
	height: 18.6rem;
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
		padding-top: 8.8rem;
	}
`;

const ChangeImg = styled.div`
	position: absolute;
	top: 20rem;
	border: 3px dashed #f47676;
	margin-top: 0.6rem;
	width: 8rem;
	height: 1.4rem;
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
			font-size: 1rem;
			font-weight: bold;
		}
	}
`;

const ImgDelete = styled.div`
	position: absolute;
	top: 0.8rem;
	right: 10%;
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
					alert("리뷰작성이 완료되었습니다.");
					dispatch(handleRevieWritewModal());
					dispatch(reviewDatas());
				});
		} else {
			alert("사진을 제외한 모든 항목을 입력해주세요");
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
				.then((el) => {
					alert("리뷰수정이 완료되었습니다.");
					dispatch(handleRevieWritewModal());
					modalHandler();
					dispatch(reviewDatas());
				});
		} else {
			alert("사진을 제외한 모든 항목을 입력해주세요");
		}
	};

	const uploadImg = (e) => {
		if (e.target.files.length + reviewImg.length > 4) {
			return alert("사진은 4장까지 올릴 수 있습니다.");
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
		setCaseName(el.phone.type);
		setCaseChoice(false);
		setReview({ ...review, caseId: el.id });
		e.stopPropagation();
	};

	const liNameChange = (e, el) => {
		setCaseName(el.phone.type);
		setReview({ ...review, caseId: el.id });
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
										console.log(el);
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
				<div>
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
										{user.userlocker.length ? (
											user.userlocker.map((el) => {
												return (
													<li key={el.id} onClick={(e) => liNameChange(e, el)}>
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
					<WriteSection onSubmit={(e) => e.preventDefault()}>
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
					</WriteSection>
				</div>
			</Wrap>
			{!data ? (
				<ReviewBtn onClick={reviewUpload}>작성 완료</ReviewBtn>
			) : (
				<ReviewBtn onClick={() => patchReviewUpload(data.id)}>
					수정 완료
				</ReviewBtn>
			)}
		</>
	);
};

export default ReviewWriteModal;
