import React from "react";
import styled from "styled-components";
import Nav from "./Nav";

const MypageSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	color: #f6f7df;

	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const MypageBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		width: 100%;
	}
`;

const CategoryBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 10vw;
	height: 60vh;
	position: sticky;
	top: 0;
	background: #5e5d49;
	border-radius: 1vh;
	box-sizing: border-box;
	padding: 15px;

	@media ${(props) => props.theme.tablet} {
		width: 13vw;
	}

	@media ${(props) => props.theme.mobileL} {
		display: none;
	}
`;

const MainSection = styled.ul`
	display: flex;
	flex-direction: column;
	width: 85vw;
	background: #5e5d49;
	box-sizing: border-box;
	border-radius: 1vh;
	padding: 15px;

	li {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100vh;
	}

	@media ${(props) => props.theme.tablet} {
		width: 76vw;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 100vw;
	}
`;

const Mypage = () => {
	return (
		<MypageSection>
			<Nav />
			<MypageBox>
				<CategoryBox>
					<div className="title">category</div>
				</CategoryBox>
				<MainSection>
					<li className="title">장바구니</li>
					<li className="title">보관함</li>
					<li className="title">회원정보수정</li>
				</MainSection>
			</MypageBox>
		</MypageSection>
	);
};

export default Mypage;
