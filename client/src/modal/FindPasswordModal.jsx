import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: #363636;
	line-height: 22px;

	input {
		width: 80%;
		height: 0.5rem;
		margin: 1rem 0rem 0.4rem;
	}

	button {
		font-size: 1rem;
		width: 5rem;
		height: 1.6rem;
		background-color: #f47676;
	}
`;

const FindPasswordModal = ({ findPasswordModal }) => {
	const [email, setEmail] = useState("");

	const emailHandler = (e) => {
		setEmail(e.target.value);
	};

	const findPassword = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}user/find-pw`, { email })
			.then(() => {
				swal("임시비밀번호를 보내드렸습니다.");
				findPasswordModal();
			})
			.catch(() => {
				swal("등록되어있지 않은 이메일입니다.");
			});
	};

	return (
		<Wrap>
			<p>가입하신 이메일을 입력해 주시면</p>
			<p>해당 이메일로 임시 비밀번호가 전송됩니다.</p>
			<input onChange={(e) => emailHandler(e)} type="text" />
			<button onClick={findPassword}>입력</button>
		</Wrap>
	);
};

export default FindPasswordModal;
