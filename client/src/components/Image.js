import React, { useState } from "react";
import styled from "styled-components";

const Image = () => {
	const [imageLoad, setImageLoad] = useState("");

	const uploadImg = (e) => {
		if (e.target.files.length <= 10) {
			let reader = new FileReader();
			let file = e.target.files[0];
			reader.onloadend = () => {
				setImageLoad({
					file: file,
					imagePreviewUrl: reader.result,
				});
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div></div>
			<div></div>
		</>
	);
};

export default Image;
