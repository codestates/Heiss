import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Thumbnail from "../components/Thumbnail";
import Test from "../modal/Test";

const NewNav = styled.div`
	background: #ff4772;
`;

const Review = () => {
	return (
		<NewNav>
			<Nav />
			<Thumbnail />
		</NewNav>
	);
};
export default Review;
