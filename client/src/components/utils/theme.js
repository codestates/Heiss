import styled, { css } from "styled-components";

// 기기 사이즈
export const size = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
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
				min-height: 2rem;
				height: 2rem;
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

	img {
		width: 100%;
		height: 100%;
		border-radius: 2vh;
	}

	&:hover {
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

export default theme;
