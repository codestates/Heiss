import React from "react";
import styled from "styled-components";
import Thumbnail from "../components/Thumbnail";
import Nav from "./Nav";

import profile from "../img/cat.jpeg";

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
	width: 200px;
	height: 30vh;
	position: sticky;
	top: 0;
	background: #3d3d3d;
	border-radius: 1vh;
	box-sizing: border-box;
	padding: 15px;

	.userinfoBox {
		display: flex;
		align-items: flex-end;

		img {
			border-radius: 50%;
			min-width: 4rem;
			min-height: 4rem;
			width: 4rem;
			height: 4rem;
		}

		.username {
			font-size: 1.2rem;
			font-weight: bold;
		}

		@media ${(props) => props.theme.tablet} {
			flex-direction: column;
			align-items: center;

			.username {
				margin-top: 0.8rem;
				font-size: 1rem;
			}
		}
	}

	.navigator {
		margin-top: 3rem;

		div {
			margin-bottom: 1rem;
			cursor: pointer;

			@media ${(props) => props.theme.tablet} {
				font-size: 0.8rem;
			}
		}
	}

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
	/* background: #5e5d49; */
	box-sizing: border-box;
	border-radius: 1vh;
	padding: 15px;

	li {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin-bottom: 3rem;
	}

	@media ${(props) => props.theme.tablet} {
		width: 76vw;
	}

	@media ${(props) => props.theme.mobileL} {
		width: 100vw;
	}
`;

const SaveBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
`;

const PutUserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	input {
		margin-bottom: 1rem;
		width: 60%;
		border-radius: 1.3vh;
		&:first-child {
			margin-top: 5rem;
		}
	}

	button {
		display: flex;
		justify-content: center;
		color: #f47676;
		background: none;
		border: 3px solid #f47676;
		width: 14rem;
		font-weight: bold;
		font-size: 2rem;
		margin-top: 2rem;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: #ffffe7;
		}
	}
`;

const Mypage = () => {
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

	return (
		<MypageSection>
			<Nav />
			<MypageBox>
				<CategoryBox>
					<div className="userinfoBox">
						<img src={profile} alt="profile" />
						<div className="username">NICKNAME</div>
					</div>
					<div className="navigator">
						{/* <div>장바구니</div> */}
						<div>보관함</div>
						<div>회원정보수정</div>
					</div>
				</CategoryBox>
				<MainSection>
					{/* <li className="title">장바구니</li> */}
					<li>
						<div className="title">보관함</div>
						<SaveBox>
							{sample.map((data, key) => (
								<Thumbnail data={data} key={key} />
							))}
						</SaveBox>
					</li>
					<li>
						<div className="title">회원정보수정</div>
						<PutUserInfoBox>
							<input
								type="password"
								placeholder="변경하실 비밀번호를 입력해주세요"
							/>
							<input
								type="password"
								placeholder="변경하실 비밀번호를 한번 더 입력해주세요"
							/>
							<input type="text" placeholder="변경하실 닉네임을 입력해주세요" />
							<button>변경</button>
						</PutUserInfoBox>
					</li>
				</MainSection>
			</MypageBox>
		</MypageSection>
	);
};

export default Mypage;
