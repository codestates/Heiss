import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";

axios.defaults.withCredentials = true;

const SigndelSection = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	color: #ffffe7;
	justify-content: center;
	align-items: center;

	.deleteInput {
		width: 60%;
		height: 0.4rem;
		margin-bottom: 1.4rem;
	}

	.title {
		font-size: 1.1rem;
		margin-bottom: 1rem;
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
		width: 4rem;
		border-radius: 1vh;
		border: 3px solid #f47676;
		margin: 0.4rem;
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

const Signdel = ({ deleteModal }) => {
	const [password, setPassword] = useState("");

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	const deleteUser = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}user/withdrawal`, { password })
			.then((el) => {
				console.log(el);
				if (el.data.message === "not found") {
					swal("일치하지 않는 비밀번호 입니다.");
				} else {
					swal("탈퇴가 완료되었습니다.");
					window.location.replace("/");
				}
			});
	};

	return (
		<SigndelSection>
			<p className="title">회원탈퇴를 진행하시겠습니까?</p>
			<input
				type="password"
				onChange={(e) => passwordHandler(e)}
				placeholder="현재 비밀번호"
				className="deleteInput"
			/>
			<BtnBox>
				<button className="btn yesBtn" onClick={deleteUser}>
					예
				</button>
				<button className="btn" onClick={deleteModal}>
					아니오
				</button>
			</BtnBox>
		</SigndelSection>
	);
};

export default Signdel;
