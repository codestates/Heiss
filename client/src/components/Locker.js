import React from "react";
import styled from "styled-components";
import { ThumbnailSections, HoverThumbs, BgnHovers } from "./utils/theme";

// 이미지
import cartIcon from "../img/cart.svg";

const LockerAllBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ThumbnailSection = styled.div`
	${ThumbnailSections}
`;

const HoverThumb = styled.div`
	${HoverThumbs}
`;

const BgnHover = styled.div`
	${BgnHovers}
`;

const Locker = ({ data }) => {
	console.log(data);
	return (
		<LockerAllBox>
			<ThumbnailSection>
				<img src={data.img} alt="img" />
				<HoverThumb className="hover-thumb">
					<BgnHover>
						<button>delete</button>
						<img src={cartIcon} alt="cartIcon" className="cart" />
					</BgnHover>
				</HoverThumb>
			</ThumbnailSection>
		</LockerAllBox>
	);
};

export default Locker;
