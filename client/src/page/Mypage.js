import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router";
import { flexCenter, color } from "../components/utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocker } from "../redux/modules/users";

// 컴포넌트
import Nav from "./Nav";
import Locker from "../components/Locker";
import Cart from "../components/Cart";
import PutUserInfo from "../components/PutUserInfo";
import OrderList from "../components/OrderList";

// 이미지
import navi1 from "../img/navi1.svg";
import navi2 from "../img/navi2.svg";
import navi3 from "../img/navi3.svg";
import navi4 from "../img/navi4.svg";

axios.defaults.withCredentials = true;

const MypageSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	color: #f6f7df;

	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	.bottomNavIcon {
		font-size: 3.5rem;
		cursor: pointer;
	}
`;

const MypageBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	.title {
		font-size: 2rem;
		font-weight: bold;
		color: ${color.point};
		width: 100%;
	}
`;

const CategoryBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 220px;
	height: 40vh;
	position: sticky;
	top: 10%;
	background: ${color.basic};
	border-radius: 1vh;
	box-sizing: border-box;
	padding: 15px;

	.userinfoBox {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		padding: 1rem;
		box-sizing: border-box;
		border-bottom: 0.5px solid ${color.lightBasic};

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

		@media (max-width: 1300px) {
			flex-direction: column;
			align-items: center;

			.username {
				margin-top: 1rem;
			}
		}
	}

	.navigator {
		margin-top: 2rem;

		div {
			margin-bottom: 1rem;
			cursor: pointer;

			@media ${(props) => props.theme.tablet} {
				font-size: 0.8rem;
			}
		}
	}

	@media (max-width: 1280px) {
		display: none;
	}
`;

const MainSection = styled.ul`
	display: flex;
	flex-direction: column;
	width: 85vw;
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

	@media ${(props) => props.theme.mobileL} {
		width: 100vw;
	}

	@media (max-width: 1280px) {
		width: 100%;
	}
`;

const SaveBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;

	@media ${(props) => props.theme.tablet} {
		justify-content: center;
	}
`;

const BottomNav = styled.div`
	width: 100%;
	height: 90px;
	background: ${color.basic};
	position: fixed;
	bottom: 0%;
	display: none;

	@media (max-width: 1280px) {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		.bottomUser {
			width: 5rem;
			height: 5rem;
			min-width: 5rem;
			min-height: 5rem;
			border-radius: 50%;
			overflow: hidden;
			background: ${color.darkBasic};
			box-shadow: -3px 3px 3px ${color.darkBasic};
			margin-bottom: 0.3rem;
			.bottomUserImg {
				width: 5rem;
				height: 5rem;
			}
		}

		.bottomNavIcon {
			${flexCenter}
			min-width: 50px;
			min-height: 50px;
			width: 4rem;
			height: 4rem;
			margin-bottom: 0.5rem;
			background: ${color.lightBasic};
			border-radius: 50%;
			border: none;
			box-shadow: 3px 3px 3px ${color.darkBasic};
			margin-bottom: 0.8rem;

			&:hover {
				transform: scale(1.02);
			}

			img {
				height: 60%;
				width: 60%;
			}
		}
	}
`;

const Mypage = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// cart 배열 받을 상태
	const [cartArr, setCartArr] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
			if (el.data.message) {
				history.push("/");
			}
		});
		dispatch(getUserLocker());
	}, []);

	const handleToShop = useCallback(() => {
		document.querySelector(".shop").scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleToSaveBox = useCallback(() => {
		document.querySelector(".save-box").scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleToOrderList = useCallback(() => {
		document.querySelector(".orderList").scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleToPutUserinfo = useCallback(() => {
		document
			.querySelector(".put-userinfo")
			.scrollIntoView({ behavior: "smooth" });
	}, []);

	const userinfo = useSelector((state) => state.user);
	const locker = useSelector((state) => state.user.userlocker);

	return (
		<MypageSection>
			<Nav />
			<MypageBox>
				<CategoryBox>
					<div className="userinfoBox">
						<img src={userinfo.userInfo.profileImg} alt="profile" />
						<div className="username">{userinfo.userInfo.userName}</div>
					</div>
					<div className="navigator">
						<div onClick={handleToSaveBox}>보관함</div>
						<div onClick={handleToShop}>장바구니</div>
						<div onClick={handleToOrderList}>주문내역</div>
						<div onClick={handleToPutUserinfo}>회원정보수정</div>
					</div>
				</CategoryBox>
				<MainSection>
					<li className="save-box">
						<div className="title">보관함</div>
						<SaveBox>
							{locker.map((data) => (
								<Locker data={data} key={data.id} />
							))}
						</SaveBox>
					</li>
					<li className="shop">
						<div className="title">장바구니</div>
						<Cart name={userinfo.userInfo.userName} cartArr={cartArr} />
					</li>
					<li className="orderList">
						<div className="title">주문내역</div>
						<OrderList />
					</li>
					<li className="put-userinfo">
						<div className="title">회원정보수정</div>
						<PutUserInfo />
					</li>
				</MainSection>
			</MypageBox>
			<BottomNav>
				<div className="bottomNavIcon" onClick={handleToSaveBox}>
					<img src={navi1} />
				</div>
				<div className="bottomNavIcon" onClick={handleToShop}>
					<img src={navi2} />
				</div>
				<div className="bottomUser">
					<img
						src={userinfo.userInfo.profileImg}
						alt="profile"
						className="bottomUserImg"
					/>
				</div>
				<div className="bottomNavIcon" onClick={handleToOrderList}>
					<img src={navi3} />
				</div>
				<div className="bottomNavIcon" onClick={handleToPutUserinfo}>
					<img src={navi4} />
				</div>
			</BottomNav>
		</MypageSection>
	);
};

export default Mypage;
