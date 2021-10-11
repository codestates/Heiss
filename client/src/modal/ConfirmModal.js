import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocker, handleAlertModal } from "../redux/modules/users";
import { useHistory } from "react-router";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	text-align: center;
	font-weight: bold;
	color: #363636;

	p {
		font-size: 1.3rem;
		text-align: center;
	}

	.text {
		display: flex;
		flex-direction: column;
	}

	div {
		display: flex;
		justify-content: space-evenly;
	}

	button {
		line-height: 1.7rem;
		font-size: 1rem;
		background-color: #f47676;
		border: 1px solid #f47676;
		border-radius: 5px;
		color: #ffffe7;
		padding: 0.1rem 0.6rem;
		margin: 1rem;
	}
`;

const ConfirmModal = ({ confirmModalHandler }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const option = () => {
		switch (user.confirmText) {
			case "삭제하시겠습니까?":
				confirmModalHandler();
				axios
					.delete(`${process.env.REACT_APP_API_URL}locker/${user.id}`)
					.then(() => {
						dispatch(handleAlertModal("삭제되었습니다"));
					});
				break;

			case "저장이 완료되었습니다":
				confirmModalHandler();
				history.push("/mypage");
				break;

			case "정말로 삭제하시겠습니까?":
				axios
					.delete(`${process.env.REACT_APP_API_URL}review/${user.id}`)
					.then(() => {
						confirmModalHandler();
						dispatch(handleAlertModal("리뷰가 삭제되었습니다"));
					});
				break;

			case "저장이 완료되었습니다":
				history.push("/mypage");

			default:
				return;
		}
	};

	return (
		<Wrap>
			<div className="text">
				<p>{user.confirmText}</p>
				<p>{user.confirmText_2}</p>
			</div>
			<div className="btn">
				<button onClick={() => option()}>확인</button>
				<button onClick={confirmModalHandler}>닫기</button>
			</div>
		</Wrap>
	);
};

export default ConfirmModal;
