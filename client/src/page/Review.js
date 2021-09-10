import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Thumbnail from "../components/Thumbnail";

const NewNav = styled.div`
	background: #ff4772;
`;

const Review = () => {
	const onClick = () => {};
	return (
		<NewNav>
			<Nav />
			<Thumbnail />
		</NewNav>
	);
};
export default Review;
