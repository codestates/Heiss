import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteUserInfo } from "../redux/modules/users";

const SigndelSection = styled.div`
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

const Signdel = ({ reverseBoo }) => {
	const dispatch = useDispatch();
	const [warr, setWarr] = useState(false);
	const [noUser, setNoUser] = useState(false);

	const withdrawal = () => {
		if (warr) {
			return dispatch(deleteUserInfo())
				.then((result) => (window.location.href = "/"))
				.catch((err) => {
					setNoUser(true);
				});
		}
	};

	return (
		<SigndelSection>
			<h2 className="title">정말로 탈퇴하시겠습니까?</h2>
			{warr && <div className="warring">탈퇴 되었습니다 감사합니다</div>}
			<BtnBox>
				<button
					className="btn yesBtn"
					onClick={(e) => {
						setWarr(true);
						withdrawal();
					}}
				>
					예
				</button>
				<button className="btn" onClick={reverseBoo}>
					아니오
				</button>
			</BtnBox>
		</SigndelSection>
	);
};

export default Signdel;
