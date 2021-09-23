import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";

// 이미지
import recIcon from "../img/Rectangle.svg";
import ellipseIcon from "../img/Ellipse 3.svg";
import triangleIcon from "../img/triangle.svg";
import PolygonIcon from "../img/Polygon1.svg";
import Polygon from "../img/Polygon.svg";

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

const Shapes = ({ canvas }) => {
	const onClick = (el) => {
		switch (el) {
			case "rect":
				const rect = new fabric.Rect({
					left: 300,
					top: 300,
					fill: "red",
					width: 20,
					height: 20,
					angle: 45,
				});
				return canvas.add(rect);
			case "circle":
				const circle = new fabric.Circle({
					radius: 50,
					fill: "green",
					// stroke: "green",
					// strokeWidth: 3,
				});
				return canvas.add(circle);

			case "triangle":
				const triangle = new fabric.Triangle({
					left: 500,
					top: 500,
					fill: "black",
					width: 20,
					height: 20,
					angle: 45,
				});
				return canvas.add(triangle);
			case "polygon":
				return fabric.loadSVGFromURL(Polygon, (objects, options) => {
					objects.forEach((object) => {
						object.set({
							fill: "black",
							scaleX: 200 / object.get("width"),
							scaleY: 200 / object.get("width"),
						});

						canvas.add(object);
					});
				});
			default:
				return "";
		}
	};

	return (
		<ShapesSection>
			{/* svg 데이터 여러개 추가하면 그때 map으로 리팩토링 */}
			<button onClick={() => onClick("rect")} className="rect">
				<img src={recIcon} alt="recIcon" />
			</button>
			<button onClick={() => onClick("circle")}>
				<img src={ellipseIcon} alt="ellipseIcon" className="circleSVG" />
			</button>
			<button onClick={() => onClick("triangle")}>
				<img src={triangleIcon} alt="triangleIcon" />
			</button>
			<button onClick={() => onClick("polygon")}>
				<img src={PolygonIcon} alt="PolygonIcon" />
			</button>
		</ShapesSection>
	);
};

export default Shapes;
