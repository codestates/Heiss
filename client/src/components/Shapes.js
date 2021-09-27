import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox } from "./utils/theme";

// 이미지
import rectIcon from "../img/Rectangle.svg";
import circleIcon from "../img/Ellipse 3.svg";
import triangleIcon from "../img/triangle.svg";
import polygonIcon from "../img/Polygon1.svg";
import Polygon from "../img/Polygon.svg";

const ShapesSection = styled.div`
	${listBox}

	.circle {
		height: 7rem;
		@media ${(props) => props.theme.tablet} {
			height: 3rem;
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
					width: 40,
					height: 40,
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
			<button onClick={() => onClick("rect")} className="rect">
				<img src={rectIcon} alt="recIcon" />
			</button>
			<button onClick={() => onClick("circle")}>
				<img src={circleIcon} alt="circleIcon" className="circle" />
			</button>
			<button onClick={() => onClick("triangle")}>
				<img src={triangleIcon} alt="triangleIcon" />
			</button>
			<button onClick={() => onClick("polygon")}>
				<img src={polygonIcon} alt="polygonIcon" />
			</button>
		</ShapesSection>
	);
};

export default Shapes;
