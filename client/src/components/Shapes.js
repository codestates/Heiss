import React from "react";
import styled from "styled-components";

// 이미지
import recIcon from "../img/Rectangle.svg";
import ellipseIcon from "../img/Ellipse 3.svg";
import triangleIcon from "../img/triangle.svg";

const ShapesSection = styled.div`
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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;
		border-radius: 1vh;
		border: 0.7px solid #2f301e;
		background-color: #2f301e;
		margin: 1rem;

		@media ${(props) => props.theme.tablet} {
			width: 4rem;
			height: 4rem;
			min-width: 4rem;
			min-height: 4rem;
		}

		img {
			height: 5rem;
			@media ${(props) => props.theme.tablet} {
				min-height: 2rem;
				height: 2rem;
			}
		}

		.circleSVG {
			height: 7rem;
			@media ${(props) => props.theme.tablet} {
				height: 3rem;
			}
		}
	}
`;

const Shapes = () => {
	return (
		<ShapesSection>
			<button>
				<img src={recIcon} alt="recIcon" />
			</button>
			<button>
				<img src={ellipseIcon} alt="ellipseIcon" className="circleSVG" />
			</button>
			<button>
				<img src={triangleIcon} alt="triangleIcon" />
			</button>
		</ShapesSection>
	);
};

export default Shapes;
