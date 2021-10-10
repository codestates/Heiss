import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { handleAlertModal } from "../redux/modules/users";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const PassSection = styled.form`
	width: 100%;

	color: #ffffe7;

	.title {
		margin-bottom: 1.4rem;
		font-size: 1.2rem;
	}

	.warring {
		display: flex;
		color: #f47676;
	}
`;

const BtnBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;

	input {
		width: 50%;
		height: 0.4rem;
		margin-right: 1rem;
		border-radius: 0.4rem;
		margin-bottom: 1rem;
	}
`;

const Button = styled.button`
	color: #ffffe7;
	width: 5rem;
	height: 2.4rem;
	border-radius: 0.5vh;
	background-color: #f47676;
	padding: 0.5rem;
	font-weight: bold;
	font-size: 1rem;

	transition: all 0.2s;
	&:hover {
		background: #f47676;
		color: #ffffe7;
	}
`;

const Pass = ({ patchModal, values, img }) => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState("");

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	const patchUser = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}user/passwordCheck`, {
				password,
			})
			.then((el) => {
				if (el.data.message) {
					const formData = new FormData();
					for (let el in values) {
						formData.append(el, values[el]);
					}
					formData.append("picture", img.file);
					axios
						.patch(`${process.env.REACT_APP_API_URL}user`, formData, {
							header: { "Content-Type": "multipart/form-data" },
						})
						.then(() => {
							dispatch(handleAlertModal("회원정보 수정이 완료되었습니다"));
						});
				}
			})
			.catch(() => {
				dispatch(
					handleAlertModal("입력하신 현재 비밀번호가 일치하지 않습니다")
				);
			});
	};

	return (
		<Wrap>
			<PassSection>
				<p className="title">회원정보를 수정하시겠습니까?</p>
				<BtnBox>
					<input
						type="password"
						name="password"
						placeholder="현재 비밀번호를 입력해 주세요."
						onChange={(e) => passwordHandler(e)}
					/>
				</BtnBox>
			</PassSection>
			<Button className="btn" onClick={patchUser}>
				변경
			</Button>
		</Wrap>
	);
};

export default Pass;
