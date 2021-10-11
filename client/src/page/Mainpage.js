import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { flexCenter, color } from "../components/utils/theme";
import HorizontalScroll from "react-scroll-horizontal";
import Fade from "react-reveal/Fade";

// 컴포넌트
import Nav from "./Nav";
import Thumbnail from "../components/Thumbnail";
import Footer from "./Footer";

// 이미지
import video from "../video/mainpage.mp4";
import logo from "../img/heiss.svg";

// gif
import gif2 from "../img/gif2.gif";
import gif3 from "../img/gif3.gif";
import startIcon from "../img/svgs/7.svg";

const MainpageSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: auto;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		display: none;
	}

	.nice {
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.7);
		margin: 1rem;
		height: 22rem;
	}

	.nice1 {
		box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.7);
		margin: 1rem;
		height: 22rem;
	}
`;

const MainpageBoxFirst = styled.ul`
	li {
		${flexCenter}
		width: 100%;
		height: 100vh;
		background: #343421;
		padding: 1rem;

		&:nth-child(1) {
			${flexCenter}
			background: none;
		}
		&:nth-child(2n) {
			background: ${color.white};
		}
		h1,
		h2,
		h3 {
			margin: 13px;
		}

		.subTitle {
			margin: 15px;
			letter-spacing: 3px;
			line-height: 27px;
			@media ${(props) => props.theme.tablet} {
				font-size: 13px;
			}
		}

		.darkFont {
			color: ${color.white};
		}

		@media ${(props) => props.theme.tablet} {
			flex-direction: column;

			&:last-child {
				flex-direction: column-reverse;
			}
		}

		.giphy-embed {
			margin: 1rem;
			height: 32rem;

			@media ${(props) => props.theme.mobileL} {
				height: 15rem;
			}
		}
	}

	.mainLogo {
		@media ${(props) => props.theme.mobileL} {
			height: 6rem;
		}

		@media ${(props) => props.theme.tablet} {
			height: 6rem;
		}
		height: 20rem;
		margin-bottom: 1rem;
	}

	video {
		position: fixed;
		min-width: 100vw;
		min-height: 100vh;
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		z-index: -1;
	}

	.columnSection {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.startBtn {
		display: flex;
		justify-content: center;
		color: ${color.point};
		background: none;
		border: 3px solid ${color.point};
		width: 14rem;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: ${color.point};
			color: ${color.white};
		}
		&:before {
			transition: all 0.3s;
		}

		@media ${(props) => props.theme.mobileL} {
			margin-top: 2rem;
		}

		@media ${(props) => props.theme.tablet} {
			width: 11rem;
		}
	}

	.animationText {
		display: flex;
		@media ${(props) => props.theme.tablet} {
			flex-direction: column;
		}
		h2 {
			@media ${(props) => props.theme.tablet} {
				font-size: 20px;
				&:last-child {
					margin-left: 3rem;
				}
			}
		}
	}

	.slide__box {
		position: relative;
		padding: 0;
		margin: 0;
		overflow: hidden; /* 슬라이더가 하나씩만 보이도록 나머지는 숨겨줌 */
		width: 13rem;
		height: 60px;
		&:hover {
			color: ${color.point};
		}
	}

	.slide__text {
		width: 100%;
		text-align: center;
		font-size: 40px;
		line-height: 52px;
		@media ${(props) => props.theme.tablet} {
			font-size: 20px;
		}
	}

	/* 첫번째부터 시작되도록함 이걸 안하면 슬라이더들이 제각각 움직임 */
	.slide__text:first-child {
		animation: slide 12s infinite;
	}

	/* 진행률마다 적용되는 CSS 값을 넣어줌 */
	@keyframes slide {
		0% {
			margin-top: 0;
		}
		16% {
			margin-top: -60px;
		}
		33% {
			margin-top: -120px;
		}
		50% {
			margin-top: -180px;
		}
		66% {
			margin-top: -120px;
		}
		82% {
			margin-top: -60px;
		}
		100% {
			margin-top: 0;
		}
	}

	.moreBtn {
		${flexCenter}
		color: ${color.point};
		font-weight: bold;
		height: 2rem;
		width: 5rem;
		border: 4px solid ${color.point};
		border-radius: 1vh;
		transition: all 0.3s;
		margin-top: 3rem;

		&:hover {
			background: ${color.point};
			color: ${color.white};
		}
	}
`;

const ReviewBox = styled.div`
	display: flex;
	width: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Mainpage = () => {
	const review = useSelector((state) => state.review.reviewAll);

	const child = { width: `10rem`, height: `100%` };
	const parent = { width: `100%`, height: `20rem` };
	return (
		<MainpageSection>
			<Nav />
			<MainpageBoxFirst>
				<li className="columnSection">
					<video autoPlay muted loop>
						<source src={video} type="video/mp4"></source>
					</video>
					<Fade top>
						<img className="mainLogo" src={logo} alt="logo" />
						<Link to="/make" className="startBtn">
							<h1>시작하기</h1>
						</Link>
					</Fade>
				</li>
				<li>
					<Fade bottom>
						<div className="columnSection">
							<h1>
								내가 마음에 드는 케이스를 친구가 사용해서 구매하지 못한적이
								있으셨나요?
							</h1>
							<div className="subTitle">
								나만의 개성, 특별함이 좋아서 시중에 판매하지 않는다 생각하고
								구매했다가 길거리에서 같은 케이스를 보면 흠칫하신적이
								있으신가요? <br />
								이쁘고 개성있는 케이스들이 많다고 생각하시나요? <br />
							</div>
						</div>
						<img src={gif3} alt="gif3" className="nice1" />
					</Fade>
				</li>
				<li>
					<Fade bottom>
						<img src={gif2} alt="gif2" className="nice" />
						<div className="columnSection darkFont">
							<div className="animationText">
								<h2>저희 Heiss는 </h2>
								<div className="slide__box">
									<h2 className="slide__text">쉽게</h2>
									<h2 className="slide__text">재밌게</h2>
									<h2 className="slide__text">간편하게</h2>
									<h2 className="slide__text">아름답게</h2>
								</div>
								<h2>당신의 케이스를 만들어드립니다</h2>
							</div>
							<div className="subTitle">
								여러분이 생각한 멋진 케이스중에서도 더 개성있는 케이스를 만들 수
								있습니다. <br />
								반려동물사진, 커플사진, 이모지, 텍스트, 색상부터 도형까지 내
								핸드폰 케이스안에서 작은 디자이너가 되어보세요! <br />
								하나뿐인 나만의 케이스 Heiss에서는 다 가능합니다!
							</div>
						</div>
					</Fade>
				</li>
				<li className="columnSection">
					<h2>이렇게 많은 사용자분들이 리뷰를 남겨주셨습니다!</h2>
					<ReviewBox style={parent}>
						<HorizontalScroll reverseScroll={true}>
							{review.map((data, key) => (
								<Thumbnail
									data={data}
									key={key}
									shareBtn={true}
									liked={data.liked}
									style={child}
								/>
							))}
						</HorizontalScroll>
					</ReviewBox>
					<Link to="/review" className="moreBtn">
						더보기
					</Link>
				</li>
				<li>
					<Fade bottom>
						<Link to="/make" className="startBtn">
							<h1>시작하기</h1>
						</Link>
						<img src={startIcon} alt="gif1" className="giphy-embed" />
					</Fade>
				</li>
			</MainpageBoxFirst>
			<Footer />
		</MainpageSection>
	);
};

export default Mainpage;
