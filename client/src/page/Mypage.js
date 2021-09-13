import React from "react";
import styled from "styled-components";
import Thumbnail from "../components/Thumbnail";
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
	/* background: #5e5d49; */
	box-sizing: border-box;
	border-radius: 1vh;
	padding: 15px;

	li {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
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

	button {
		border-radius: 2vh;
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
					<div className="title">category</div>
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
