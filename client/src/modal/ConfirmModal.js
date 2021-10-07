import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocker } from "../redux/modules/users";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	/* justify-content: space-evenly; */
	/* align-items: flex-end; */
	font-weight: bold;
	color: #363636;

	p {
		font-size: 1.3rem;
	}

	div {
		display: flex;
		justify-content: space-evenly;
		align-items: flex-end;
	}

	button {
		line-height: 1.7rem;
		font-size: 1rem;
		width: 5rem;
		height: 1.7rem;
		margin-top: 2.4rem;
		background-color: #f47676;
		border: 1px solid #f47676;
		border-radius: 5px;
		color: #ffffe7;
	}
`;

const ConfirmModal = ({ confirmModalHandler }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// const ok = () => {};

	const option = () => {
		switch (user.confirmText) {
			case "삭제하시겠습니까?":
				return confirmModalHandler(), dispatch(getUserLocker());

			default:
				return;
		}
	};

	return (
		<Wrap>
			<p>{user.confirmText}</p>
			<div>
				<button onClick={() => option()}>확인</button>
				<button onClick={confirmModalHandler}>닫기</button>
			</div>
		</Wrap>
	);
};

export default ConfirmModal;
