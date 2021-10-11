import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reviewDatas, handleRevieWritewModal } from "../redux/modules/review";
import {
	handleLoginModal,
	getUserInfo,
	getUserLocker,
} from "../redux/modules/users";
import { useHistory } from "react-router";
axios.defaults.withCredentials = true;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: #363636;

	p {
		font-size: 1.3rem;
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

const AlertModal = ({ alertModalHandler }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const option = () => {
		let url = window.location.pathname;
		switch (user.alertText) {
			case "로그인이 완료되었습니다":
				window.location.replace(url);
				break;

			case "로그아웃 되었습니다":
				window.location.replace(url);
				break;

			case "리뷰작성이 완료되었습니다":
				dispatch(handleRevieWritewModal());
				dispatch(reviewDatas());
				break;

			case "회원가입이 완료되었습니다!":
				dispatch(handleLoginModal());
				dispatch(getUserInfo());
				break;

			case "리뷰가 삭제되었습니다":
				window.location.replace("/review");
				break;

			case "결제가 완료되었습니다":
				window.location.replace(url);
				break;

			case "탈퇴가 완료되었습니다":
				window.location.replace("/");
				break;

			case "삭제되었습니다":
				dispatch(getUserLocker());
				break;

			case "회원정보 수정이 완료되었습니다":
				window.location.replace("/mypage");
				break;

			default:
				return;
		}
	};

	return (
		<Wrap>
			<p>{user.alertText}</p>
			<button
				onClick={() => {
					alertModalHandler();
					option();
				}}
			>
				확인
			</button>
		</Wrap>
	);
};

export default AlertModal;
