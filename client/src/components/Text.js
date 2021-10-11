import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox } from "./utils/theme";

const TextSection = styled.div`
	${listBox}

	button {
		flex-direction: column;
	}
`;

const Text = ({ canvas }) => {
	// 폰트 상태
	const [fontFamily, setFontFamily] = useState("");
	// 폰트 굵기
	const [fontWeight, setFontWeight] = useState(400);
	// 테두리 굵기
	const [stroke, setStroke] = useState(0);

	// 텍스트 추가 핸들러
	const textOnClick = () => {
		const textbox = new fabric.Textbox("내용을 입력하세요", {
			fontFamily: fontFamily,
			fontWeight: 400,
		});

		return canvas.add(textbox);
	};

	// 폰트 변경 핸들러
	const handleChangeFont = (e) => {
		e.preventDefault();
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			item.set("fontFamily", e.target.value);
		});
		setFontFamily(e.target.value);

		canvas.renderAll();
	};

	// 굵기 변경 핸들러
	const handleChangeWeight = (e) => {
		e.preventDefault();
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			item.set("fontWeight", e.target.value);
		});
		setFontWeight(e.target.value);

		canvas.renderAll();
	};

	// 선 변경 핸들러
	const handleStroke = (e) => {
		e.preventDefault();
		const items = canvas.getActiveObjects();
		items.forEach((item) => {
			item.set("stroke", "black");
			item.set("strokeWidth", e.target.value);
		});
		setStroke(e.target.value);
		canvas.renderAll();
	};

	return (
		<TextSection>
			<button onClick={textOnClick}>텍스트 추가</button>
			<button>
				글꼴
				<select
					className="family"
					defaultValue={fontFamily}
					onChange={handleChangeFont}
					style={{ fontFamily: fontFamily }}
				>
					{[
						"sans-serif",
						"serif",
						"Georgia",
						"cursive",
						"system-ui",
						"BebasNeue",
						"Birthstone",
						"Arial",
						"Ephesis",
						"GothicA1",
						"GothicA1-Bold",
						"GothicA1-ExtraBold",
						"GothicA1-ExtraLight",
						"GothicA1-Medium",
					].map((el, val) => (
						<option key={val} value={el}>
							{el}
						</option>
					))}
				</select>
			</button>
			<button>
				굵기
				<select
					className="weight"
					defaultValue={fontWeight}
					onChange={handleChangeWeight}
					style={{ fontWeight: fontWeight }}
				>
					{[200, 300, 400, 500, 600, 700, 800, 900].map((el, val) => (
						<option key={val} value={el}>
							{el}
						</option>
					))}
				</select>
			</button>
			<button>
				테두리
				<select
					className="weight"
					defaultValue={stroke}
					onChange={handleStroke}
					style={{ stroke: stroke }}
				>
					{[1, 2, 3, 4, 5].map((el, val) => (
						<option key={val} value={el}>
							{el}
						</option>
					))}
				</select>
			</button>
		</TextSection>
	);
};

export default Text;
