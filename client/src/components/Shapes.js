import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";

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
		background-color: #3d3d3d;
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

const Shapes = ({ canvasAddHandler }) => {
	const onClick = (e) => {
		console.log(e.target.className);
		switch (e.target.className) {
			case "rect":
				const rect = new fabric.Rect({
					left: 100,
					top: 100,
					fill: "red",
					width: 20,
					height: 20,
					angle: 45,
				});
				return canvasAddHandler(rect);
			default:
				return "";
		}
	};
	return (
		<ShapesSection>
			<button onClick={onClick} className="rect">
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
