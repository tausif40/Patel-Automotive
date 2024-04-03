import './profile.css';
import { CiEdit } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userUrl } from "../../../app.url";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
	const navigate = useNavigate();
	const [ userData, setUserData ] = useState([]);
	const [ password, setPassword ] = useState('***************');
	const user_token = localStorage.getItem('user_token');

	useEffect(() => {
		if (user_token && user_token !== "null") {
			axios.get(userUrl + "fetch?user_token=" + user_token)
				.then((response) => { setUserData(response.data) })
				.catch((error) => { console.log(error) });
		}
	}, []);

	const LogOutHandel = () => {
		Swal.fire({
			position: "center",
			title: "Are you sure?",
			text: "You can login again to access your account!",
			icon: "question",
			reverseButtons: true,
			showCancelButton: true,
			denyButtonColor: "#6e7881",
			confirmButtonColor: "#e02222",
			confirmButtonText: "Conform",
			cancelButtonText: "cancel"
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.clear();
				navigate("/");
				toast.success("Log Out Successfully", {
					autoClose: 500,
				});
			}
		});
	}
	const showPassword = () => {
		let inputPsd = prompt("Enter your password");
		if (inputPsd === null) {
			return;
		} else if (inputPsd === "") {
			return;
		} else if (inputPsd === userData[ 0 ].password) {
			setPassword(userData[ 0 ].password)
		} else {
			toast.error("Entered password is incorrect!");
		}
	}
	return (
		<>
			<div className="profile pt-32">
				<div className="container">
					<div className="profile-section flex items-center flex-col">
						<div className="header flex justify-between w-1/2">
							<h2>Your Details</h2>
							<Link to={'/profile/editProfile'} className="">
								<button className="edit-btn flex "> <CiEdit size={25} /> <span>&nbsp;Edit</span></button>
							</Link>
						</div>
						{
							userData.map((data) => (
								<div className="profile-details w-1/2">
									<div className="flex">
										<p className="w-1/2 font-semibold">Name</p>
										<p>{data.name}</p>
									</div>
									<div className="flex">
										<p className="w-1/2 font-semibold">Email</p>
										<p>{data.email}</p>
									</div>
									<div className="flex">
										<p className="w-1/2 font-semibold">Mobile No. </p>
										<p>{data.phone}</p>
									</div>
									<div className="flex">
										<p className="w-1/2 font-semibold">Password </p>
										<p className="w-1/2 flex justify-between">
											<span>{password}</span> <span className='showPassword' onClick={showPassword}>Show</span>
										</p>
									</div>
									<div className="flex justify-center mt-10">
										<button className="profileLogOut-btn" onClick={LogOutHandel}>Log Out</button>
									</div>
								</div>
							))
						}
					</div>
				</div >
			</div >
		</>
	);
}

export default Profile;
