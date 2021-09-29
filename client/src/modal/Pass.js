import React, { useState } from "react";
import styled from "styled-components";

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

const Pass = ({ reversePassword }) => {
	const [warr, setWarr] = useState(false);
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const handleChange = ({ target: { value } }) => setPassword(value);

	const handleSubmit = async (e) => {
		setDisabled(true);
		e.preventDefault();
		await new Promise((r) => setTimeout(r, 1000));
		if (password.length < 8) {
			alert("8자의 이상의 비밀번호를 사용하셔야 합니다.");
		} else {
			alert("변경되었습니다.");
		}
		setDisabled(false);
	};

	return (
		<PassSection onSubmit={handleSubmit}>
			<h2 className="title">회원정보를 수정하시겠습니까?</h2>
			<BtnBox>
				<input
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
				/>
				<button type="submit" className="btn" onClick={reversePassword}>
					비밀번호 변경
				</button>
			</BtnBox>
		</PassSection>
	);
};

export default Pass;
