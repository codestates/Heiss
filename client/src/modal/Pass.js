import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { newUserInfo } from "../redux/modules/users";
import { patchUserInfo } from "../redux/modules/users";

const PassSection = styled.form`
	display: flex;
	flex-direction: column;
	color: #ffffe7;
	justify-content: center;
	align-items: center;

	.title {
		margin-bottom: 3rem;
	}

	.warring {
		display: flex;
		color: #f47676;
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: space-around;

	.btn {
		color: #f47676;
		width: 5rem;
		border-radius: 1vh;
		border: 3px solid #f47676;
		margin: 1rem;
		padding: 0.5rem;
		font-weight: bold;
		font-size: 1rem;

		transition: all 0.5s;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
	}

	.yesBtn {
		color: #ffffe7;
		border: 3px solid #ffffe7;
		&:hover {
			color: #f47676;
			background: #fffffe;
		}
	}
`;

const Pass = () => {
	// const [password, setPassword] = useState("")
	const dispatch = useDispatch();
	const [userCode, setUserCode] = useState("");
	const [hash, setHash] = useState("");
	const [img, setImg] = useState({});

	const handleSubmit = async (values) => {
		let user = await axios.post(
			`${process.env.REACT_APP_API_URL}user/mypage`,
			values
		);
		if (user.data.message === "password err") {
			alert("비밀번호가 일치하지 않습니다");
		} else {
			alert("회원정보 수정이 완료되었습니다.");
			dispatch(patchUserInfo());
			let url = window.location.pathname;
			window.location.replace(url);
			dispatch(newUserInfo());
		}
	};
// 	const passwordCheck = async (values) => {
// 		axios
// 			.post(`${process.env.REACT_APP_API_URL}user/mypage`, {
// 				code: userCode,
// 				hashedcode: hash,
// 			})
// 			.then(() => {
// 				const formData = new FormData();
// 				for (let el in values) {
// 					formData.append(el, values[el]);
// 				}
// 				formData.append("picture", img.file);
// 				axios
// 					.post(`${process.env.REACT_APP_API_URL}user/mypage`, formData, {
// 						header: { "Content-Type": "multipart/form-data" },
// 					})
// 					.then(() => {
// 						alert("회원가입이 완료되었습니다!");
// 						dispatch(patchUserInfo());
// 						dispatch(newUserInfo());
// 					});
// 			});
// 	};

	return (
		<PassSection onSubmit={handleSubmit}>
			<h2 className="title">회원정보를 수정하시겠습니까?</h2>
			<BtnBox>
				<input
					type="password"
					name="password"
					// value={password}
					onChange={passwordCheck}
				/>
				<button type="submit" className="btn">
					변경
				</button>
			</BtnBox>
		</PassSection>
	);
};

export default Pass;
