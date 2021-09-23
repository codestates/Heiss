import React, { useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";

const TextSection = styled.div`
	display: flex;
	/* flex-direction: column; */
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	button {
		display: flex;
		flex-direction: column;
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
		color: #f47676;
		font-size: 1.4rem;
		font-weight: bold;

		@media ${(props) => props.theme.tablet} {
			width: 4rem;
			height: 4rem;
			min-width: 4rem;
			min-height: 4rem;
			font-size: 1rem;
		}

		select {
			margin-top: 0.5rem;
		}
	}

	select {
		width: 6rem;
		text-align: center;
		outline: none;
		background: #555555;
		border-radius: 2vh;
		color: lightgray;
	}
`;

const Text = ({ canvas }) => {
	// 폰트 상태
	const [fontFamily, setFontFamily] = useState("sans-serif");
	// 폰트 굵기
	const [fontWeight, setFontWeight] = useState(400);

	// 텍스트 추가 핸들러
	const textOnClick = () => {
		const textbox = new fabric.IText("내용을 입력하세요", {
			fontFamily: fontFamily,
			fontWeight: 800,
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
					{["sans-serif", "serif", "Georgia", "cursive", "system-ui"].map(
						(el, val) => (
							<option key={val} value={el}>
								{el}
							</option>
						)
					)}
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
		</TextSection>
	);
};

export default Text;
