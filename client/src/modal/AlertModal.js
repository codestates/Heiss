import React, { useState } from "react";
const AlertModal = (props) => {
	const { open, close, alertString, alertBtn } = props;
	// const [open, setOpen] = useState(false);

	// 	const handleClick = () => {
	// 		setOpen(true);
	// 	};

	return (
		<div className="modalcontainer stopdragging">
			{open ? (
				<div className="modalbackdrop">
					<div className="modalview">
						<div className="desc">
							{alertString.split("\n").map((line) => (
								<span key={line}>
									{line}
									<br />
								</span>
							))}
							<button className="closebtn" onClick={close}>
								{alertBtn}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};
export default AlertModal;

// export default Alert;

// import React from "react";
// import { SnackbarProvider } from "notistack";
// import { useSnackbar } from "notistack";

// const AlertModal = () => {
// 	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
// 	return (
// 		<SnackbarProvider>
// 			<div className="App">
// 				<button onClick={() => enqueueSnackbar("로그인이 되었습니다")}></button>
// 			</div>
// 		</SnackbarProvider>
// 	);
// };
