import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../img/heiss.svg";

const FooterSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: black;
	width: 100vw;
	height: 7vh;
	padding: 0.5rem;
	color: white;

	@media ${(props) => props.theme.mobileL} {
		flex-direction: column;
		justify-content: center;
	}
`;

const LogoBox = styled.div`
	display: flex;
	align-items: center;
	margin-left: 0.5rem;

	img {
		height: 2rem;
		cursor: pointer;
	}

	.copyright {
		margin-top: 7px;
		margin-left: 1rem;
	}
`;

const GithubBox = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-right: 2rem;

	li {
		cursor: pointer;
		margin-right: 1rem;

		a {
			color: white;
			font-weight: bold;
		}
	}

	@media ${(props) => props.theme.mobileL} {
		margin-top: 0.4rem;
		margin-right: 0;
	}
`;

const Footer = () => {
	return (
		<FooterSection>
			<LogoBox>
				<a href="https://github.com/codestates/Heiss">
					<img src={logo} alt="heiss" />
				</a>
				<div className="copyright">Copyright © 2021 Heiss</div>
			</LogoBox>
			<GithubBox>
				<li>
					<a href="https://github.com/JangSeokJin1228">장석진</a>
				</li>
				<li>
					<a href="https://github.com/yeeun62">방예은</a>
				</li>
				<li>
					<a href="https://github.com/sungminyun1">윤성민</a>
				</li>
				<li>
					<a href="https://github.com/KAEN7">이성훈</a>
				</li>
			</GithubBox>
		</FooterSection>
	);
};

export default Footer;
