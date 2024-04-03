import React, { useEffect, useState } from "react";
import './editProfile.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userUrl } from "../../../../app.url";
import ChangePassword from "../ChangePassword/changePassword";
import { toast } from "react-toastify";

function EditProfile() {
	const navigate = useNavigate();
	const [ userData, setUserData ] = useState([]);
	const [ name, setName ] = useState();
	const [ email, setEmail ] = useState();
	const [ phone, setPhone ] = useState();
	const [ password, setPassword ] = useState();
	const [ showPsdPage, setShowPsdPage ] = useState(false);

	const user_token = localStorage.getItem('user_token');

	useEffect(() => {
		axios.get(userUrl + "fetch?user_token=" + user_token)
			.then((response) => {
				setUserData(response.data[ 0 ]);
				setName(response.data[ 0 ].name);
				setEmail(response.data[ 0 ].email);
				setPhone(response.data[ 0 ].phone);
				setPassword(response.data[ 0 ].password);
			}).catch((error) => { console.log(error) });
	}, []);

	const togglePsdPage = () => {
		setShowPsdPage(!showPsdPage);
	};

	const handelUpdate = () => {
		const updateDetails = { condition_obj: { user_token: user_token }, content_obj: { name: name, email: email, phone: phone } };
		axios.patch(userUrl + "update", updateDetails)
			.then((response) => {
				toast.success("Profile Updated Successfully", { autoClose: 600 });
				navigate('/profile');
			}).catch((error) => { toast.error("Network error !", { autoClose: 600 }); });
	}

	return (
		<>
			<div className="profile pt-32">
				<div className="container">
					<div className="flex items-center flex-col">
						<div className="header flex justify-between w-1/2">
							<h2>Your Details</h2>
							<button className="save-btn flex" onClick={handelUpdate}> <span>Save</span></button>
						</div>
						<div className="profile-details w-1/2">
							<div className="flex">
								<p className="w-1/2 font-semibold">Name</p>
								<input type="text" value={name} onChange={e => { setName(e.target.value) }} />
							</div>
							<div className="flex">
								<p className="w-1/2 font-semibold">Email</p>
								<input type="text" value={email} onChange={e => { setEmail(e.target.value) }} />
							</div>
							<div className="flex">
								<p className="w-1/2 font-semibold">Mobile No. </p>
								<input type="number" value={phone} onChange={e => { setPhone(e.target.value) }} />
							</div>
							<div className="flex">
								<p className="w-1/2 font-semibold">Password </p>
								<p className="changePassword" onClick={togglePsdPage}>change password</p>
							</div>
							<div className="flex justify-center mt-10">
								<button className="profileLogOut-btn" onClick={handelUpdate}>Save</button>
							</div>
						</div>
					</div>
				</div>
				<div className={`changePsd`}>
					{showPsdPage && <ChangePassword />}
				</div>
			</div>
		</>
	);
}

export default EditProfile;
