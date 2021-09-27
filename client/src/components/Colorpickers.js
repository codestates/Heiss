import React from "react";
import styled from "styled-components";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorPickerSection = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	width: 97%;
	height: 100%;
`;

const Colorpickers = ({ canvas }) => {
	const [color, setColor] = useColor("hex", "#121212");

	const items = canvas.getActiveObjects();
	items.forEach((item) => {
		item.set("fill", color.hex);
		canvas.renderAll();
	});

	return (
		<ColorPickerSection>
			<ColorPicker
				width={800}
				height={100}
				color={color}
				onChange={setColor}
				hideHSV
				hideHEX
				hideRGB
				dark
			/>
		</ColorPickerSection>
	);
};

export default Colorpickers;
