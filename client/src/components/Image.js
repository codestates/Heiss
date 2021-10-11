import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { flexCenter } from "./utils/theme";

const ImageSection = styled.div`
	${flexCenter}
	position: relative;
	border: 4px dashed #f47676;
	margin-top: 2rem;
	width: 50%;
	height: 3rem;
	border-radius: 1vh;
	&:hover {
		transform: scale(1.03);
	}

	@media ${(props) => props.theme.tablet} {
		width: 14rem;
	}

	input {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
	.imgText {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		font-weight: bold;
	}
`;

const Image = ({ canvas }) => {
	const handleImage = (e) => {
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onload = () => {
			new fabric.Image.fromURL(reader.result, (image) => {
				image.scale(0.75);
				canvas.add(image);
				canvas.renderAll();
			});
		};
		reader.readAsDataURL(file);
	};

	return (
		<ImageSection>
			<input type="file" id="imgLoader" onChange={handleImage} />
			<div className="imgText">이미지를 올려주세요</div>
		</ImageSection>
	);
};

export default Image;
