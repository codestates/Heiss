import React, { useState } from "react";
import styled from "styled-components";
import Test from "../modal/Test";
import Modal from "react-modal";

const Wrap = styled.div`
	padding-bottom: 6%;
	column-count: 4;
	column-gap: 1em;
`;

const Items = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1em;
	cursor: pointer;
`;

const Figure = styled.div`
	display: inline-block;
	filter: grayscale(0.8);
	&:hover {
		filter: none;
	}
`;

const Image = styled.img`
	width: 100%;
`;

const Thumbnail = () => {
	const sample = [
		"https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg",
		"https://cdn.pixabay.com/photo/2020/05/25/20/14/holland-iris-5220407__340.jpg",
		"https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg",
		"https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png",
		"https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg",
		"https://cdn.pixabay.com/photo/2020/08/04/14/42/sky-5463015__340.jpg",
		"https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg",
		"https://cdn.pixabay.com/photo/2020/01/09/01/00/the-eye-on-the-greek-4751572__340.png",
		"https://cdn.pixabay.com/photo/2021/01/30/12/19/couple-5963678__340.png",
		"https://cdn.pixabay.com/photo/2021/01/23/07/53/dogs-5941898__340.jpg",
		"https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg",
	];
	const [isOpen, setIsOpen] = useState(false);
	const openModalHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Wrap>
				<Modal
					isOpen={
						!isOpen
							? sample.map((x, y) => {
									return (
										<Items key={y}>
											<Figure>
												<Image src={x} onClick={() => openModalHandler(true)} />
											</Figure>
										</Items>
									);
							  })
							: sample.map((x, y) => {
									return (
										<Items key={y}>
											<Figure>
												<Image src={x} />
											</Figure>
										</Items>
									);
							  })
					}
				></Modal>
			</Wrap>
		</>
	);
};

export default Thumbnail;
