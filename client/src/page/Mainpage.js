import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../components/utils/theme";
import Nav from "./Nav";
import video from "../video/mainpage.mp4";
import logo from "../img/heiss.png";

const MainpageSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
`;

const MainpageBoxFirst = styled.ul`
	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background: #343421;
		&:nth-child(1) {
			background: none;
		}
		&:nth-child(2n) {
			background: #ffffe7;
		}
		h1,
		h2,
		h3 {
			margin: 13px;
		}
	}

	.mainLogo {
		margin-bottom: 4.4rem;
	}

	video {
		position: fixed;
		min-width: 100vw;
		min-height: 100vh;
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		z-index: -1;
	}

	.columnSection {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.startBtn {
		display: flex;
		justify-content: center;
		color: #f47676;
		/* background: #ffffe7; */
		background: none;
		border: 3px solid #f47676;
		width: 14rem;
		margin-right: 3rem;
	}
`;

const Mainpage = () => {
	const [navbar, setNavbar] = useState("hidden");

	// useEffect(() => {
	// 	window.addEventListener("scroll", getCurrentScroll);
	// 	return () => window.removeEventListener("scroll", getCurrentScroll);
	// });

	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			return console.log("스크롤");
		});
	});

	const getCurrentScroll = () => {
		if ((window.scrollY / document.body.clientHeight) * 100 < 20) {
			setNavbar("hidden");
		} else if ((window.scrollY / document.body.clientHeight) * 100 > 20) {
			setNavbar("nope");
		}
	};

	return (
		<MainpageSection>
			<Nav />
			<MainpageBoxFirst>
				<li className="columnSection">
					<video autoPlay muted loop>
						<source src={video} type="video/mp4"></source>
					</video>
					<img className="mainLogo" src={logo} alt="logo" />
					<Link to="/make" className="startBtn">
						<h1>시작하기</h1>
					</Link>
				</li>
				<li>
					<h1>나만의 케이스를 만들고 싶으신가요?</h1>
					<iframe
						src="https://giphy.com/embed/Zd5EQ6iemgnwkgaAhm"
						width="480"
						height="270"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
				<li>
					<iframe
						src="https://giphy.com/embed/3o6gEfdyoCJixUpHA4"
						width="480"
						height="480"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
					<h2>저희 Heiss는 재밌고 쉽게 당신의 케이스를 만들어드립니다</h2>
				</li>
				<li className="columnSection">
					<h2>이렇게 많은 사용자분들이 리뷰를 남겨주셨습니다!</h2>
					<iframe
						src="https://giphy.com/embed/fdiWBMyTEAhjy"
						width="480"
						height="199"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
				<li>
					<Link to="/make" className="startBtn">
						<h1>시작하기</h1>
					</Link>
					<iframe
						src="https://giphy.com/embed/MCFswP59sGKkkcTjX5"
						width="480"
						height="360"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
			</MainpageBoxFirst>
		</MainpageSection>
	);
};

export default Mainpage;
