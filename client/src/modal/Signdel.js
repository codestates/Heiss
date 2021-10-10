import React, { useDebugValue, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { handleAlertModal } from "../redux/modules/users";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

const SigndelSection = styled.div`
	color: #3d3d3d;
	font-weight: bold;

	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.deleteInput {
		width: 60%;
		height: 0.4rem;
		color: #3d3d3d;
	}

	.deleteInput::placeholder {
		color: #ccc;
	}

	.title {
		font-size: 1.4rem;
		margin: 1.5rem 0rem;
	}
`;

const BtnBox = styled.div`
	.btn {
		color: #f47676;
		border-radius: 1vh;
		border: 3px solid #f47676;
		margin: 0.4rem;
		padding: 0.7rem;
		font-weight: bold;
		font-size: 1rem;
		transition: all 0.5s;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
	}
`;

const Signdel = ({ deleteModal }) => {
	const dispatch = useDispatch();
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
					dispatch(handleAlertModal("일치하지 않는 비밀번호 입니다"));
				} else {
					dispatch(handleAlertModal("탈퇴가 완료되었습니다"));
				}
			});
	};

	return (
		<SigndelSection>
			<div className="wrap">
				<p className="title">회원탈퇴를 진행하시겠습니까?</p>
				<input
					type="password"
					onChange={(e) => passwordHandler(e)}
					placeholder="현재 비밀번호를 입력해주세요"
					className="deleteInput"
				/>
				<BtnBox>
					<button className="btn" onClick={deleteUser}>
						예
					</button>
					<button className="btn" onClick={deleteModal}>
						아니오
					</button>
				</BtnBox>
			</div>
		</SigndelSection>
	);
};

export default Signdel;
