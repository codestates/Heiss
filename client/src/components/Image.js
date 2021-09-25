import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";

const ImageSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	border: 4px dashed #f47676;
	margin-top: 2rem;
	width: 31.4rem;
	height: 3rem;
	border-radius: 1vh;
	&:hover {
		transform: scale(1.1);
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
	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		font-weight: bold;
	}

	img {
		display: none;
	}
`;

const Image = ({ canvas }) => {
	function handleImage(e) {
		const reader = new FileReader();
		reader.onload = (event) => {
			console.log("fdsf");
			const imgObj = new Image();
			imgObj.src = event.target.result;
			imgObj.onload = function () {
				// start fabricJS stuff
				const image = new fabric.Image(imgObj);
				image.set({
					left: 250,
					top: 250,
					padding: 10,
					cornersize: 10,
				});
				//image.scale(getRandomNum(0.1, 0.25)).setCoords();
				canvas.add(image);
				// end fabricJS stuff
			};
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	return (
		<ImageSection>
			<input type="file" id="imgLoader" onChange={handleImage} />
			<div>이미지를 올려주세요</div>
		</ImageSection>
	);
};

export default Image;
