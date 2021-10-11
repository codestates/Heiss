import styled, { css } from "styled-components";

// 기기 사이즈
export const size = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopM: "1240px",
	laptopL: "1440px",
	desktop: "2560px",
};

// 미디어 스타일
const theme = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopM: `(max-width: ${size.laptopM})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};

// color
export const color = {
	basic: "#3d3d3d",
	point: "#f47676",
	darkBasic: "#171717",
	lightBasic: "#555555",
	white: "#ffffe7",
	warring: "#ff5b4f",
};

// flex 디자인
export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

// canvas list box style
export const listBox = css`
	display: flex;
	/* flex-direction: column; */
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	button {
		${flexCenter}
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;
		border-radius: 1vh;
		border: 0.7px solid #2f301e;
		background-color: ${color.basic};
		margin: 1rem;
		color: ${color.point};
		font-size: 1.4rem;
		font-weight: bold;
		@media ${(props) => props.theme.tablet} {
			width: 6rem;
			height: 6rem;
			min-width: 6rem;
			min-height: 6rem;
			font-size: 1rem;
		}
		img {
			height: 5rem;
			@media ${(props) => props.theme.tablet} {
				min-height: 3rem;
				height: 3rem;
			}
		}
		select {
			margin-top: 0.5rem;
			width: 6rem;
			text-align: center;
			outline: none;
			background: ${color.lightBasic};
			border-radius: 2vh;
			color: ${color.white};
			@media ${(props) => props.theme.tablet} {
				width: 3rem;
			}
		}
	}
`;

// phoneList
export const phoneList = css`
	display: flex;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	justify-content: flex-start;

	button {
		cursor: pointer;
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;
		border-radius: 1vh;
		border: 0.7px solid #2f301e;
		background-color: ${color.basic};
		margin: 1rem;
		color: ${color.point};
		font-weight: bold;

		@media ${(props) => props.theme.tablet} {
			width: 6rem;
			height: 6rem;
			min-width: 6rem;
			min-height: 6rem;
			font-size: 1rem;
		}

		p:nth-child(1) {
			font-size: 1.7rem;
			margin-top: 1.8rem;

			@media ${(props) => props.theme.tablet} {
				font-size: 1.2rem;
				margin-top: 0.9rem;
			}
		}
		p:nth-child(2) {
			margin-top: 0.4rem;
			font-size: 1rem;
			color: #9e9e9e;
		}
		p:nth-child(3) {
			font-size: 1rem;
			color: #9e9e9e;
			margin: 0.3rem 0rem;
		}

		&:nth-child(5) {
			p:nth-child(2) {
				font-size: 1rem;
				color: ${color.point};
				margin: 0rem 0rem 0.5rem;
				line-height: 0.3rem;
			}
		}
		&:nth-child(6) {
			p:nth-child(2) {
				font-size: 1rem;
				color: ${color.point};
				margin: 0rem 0rem 0.5rem;
				line-height: 0.3rem;
			}
		}
		&:nth-child(7) {
			p:nth-child(2) {
				font-size: 1rem;
				color: ${color.point};
				margin: 0rem 0rem 0.5rem;
				line-height: 0.3rem;
			}
		}

		.pro {
			font-size: 1rem;
			color: red;
			margin: 0rem 0rem 0.5rem;
			line-height: 0.1rem;
		}

		.style {
			color: #9e9e9e;
			margin-top: 0rem;
		}

		.price {
			color: #9e9e9e;
			margin-top: 0rem;
		}
	}
`;

// 리뷰 및 보관함 컴포넌트 스타일
export const ThumbnailSections = css`
	display: flex;
	flex-direction: column;
	min-height: 300px;
	height: 300px;
	min-width: 220px;
	width: 220px;
	margin: 1rem;
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease-out;
	border-radius: 2vh;
	box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.2);

	img {
		width: 100%;
		height: 100%;
		border-radius: 2vh;
	}

	&:hover {
		transform: translateY(-10px);

		.hover-thumb {
			display: flex;
		}
	}
`;

export const HoverThumbs = css`
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	position: absolute;
	/* background: rgba(128, 128, 128, 0.5); */
	border-radius: 2vh;
	z-index: 2;

	.heart {
		height: 2rem;
		margin: 1rem;
		margin-left: 5rem;
		z-index: 2;
	}
`;

export const BgnHovers = css`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(128, 128, 128, 0.5);
	border-radius: 2vh;
`;

export const nonHoverButton = css`
	${flexCenter}
	font-weight: bold;
	height: 2rem;
	background: ${color.point};
	color: ${color.white};
	width: 8rem;
	border: 4px solid ${color.point};
	border-radius: 1vh;
	transition: all 0.3s;
`;

// ImgDiv
export const ImgDivs = css`
	max-width: 15rem;
	max-height: 15rem;
	width: 15rem;
	height: 15rem;
	min-width: 3rem;
	min-height: 3rem;
	position: relative;
	border: 4px solid ${color.point};
	border-radius: 50%;
	overflow: hidden;
	&:hover {
		background-color: #f7caca;
		border: 4px dashed ${color.point};
	}
	> .img {
		width: 100%;
		height: 100%;
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
`;

export default theme;
