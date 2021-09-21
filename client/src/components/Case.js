import React from "react";
import styled from "styled-components";
import { fabric } from "fabric";

const CaseSection = styled.div`
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

		img {
			height: 5rem;
			@media ${(props) => props.theme.tablet} {
				min-height: 2rem;
				height: 2rem;
			}
		}
	}
`;

const Case = () => {
	return (
		<CaseSection>
			<button>Galaxy21</button>
			<button>iPhone13</button>
		</CaseSection>
	);
};

export default Case;
