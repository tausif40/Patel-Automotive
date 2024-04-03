import React, { useState } from 'react'
import './changePassword.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userUrl } from '../../../../app.url';
import { toast } from 'react-toastify';

function ChangePassword() {

	const navigate = useNavigate();

	const [ error, setError ] = useState("")
	const [ oldPsd, setOldPsd ] = useState();
	const [ newPsd, setNewPsd ] = useState()
	const [ confirmNewPsd, setConfirmNewPsd ] = useState()
	const [ cancelPsdPage, setCancelPsdPage ] = useState('block');

	const handelCancel = () => {
		setCancelPsdPage("hidden")
	}

	const handelUpdate = () => {

		let valid = true;
		if (newPsd.length < 9) {
			setError("password must be 8 to 20 char")
			valid = false
		} else if (newPsd != confirmNewPsd) {
			setError("confirm Password not match")
			valid = false
		}

		axios.get(userUrl + "fetch?user_token=" + localStorage.getItem('user_token') + "&password=" + oldPsd)
			.then((response) => {
				if (valid) {
					let updateDetails = { condition_obj: { user_token: localStorage.getItem("user_token") }, content_obj: { password: confirmNewPsd } };
					axios.patch(userUrl + "update", updateDetails)
						.then((response) => {
							toast.success("Password updated successfully")
							navigate('/profile')
						}).catch((error) => { setError("Network error!!, Please try latter.") });
				}
			})
			.catch((error) => { setError("Old password is incorrect") });
	}

	return (
		<>
			<div className={`passwordChange-section ${cancelPsdPage}`}>
				<div className="passwordChange-page flex">
					<div className='passwordChange'>
						<p className='errorMsg'>{error}</p>

						<p>Enter old password</p>
						<input type="text" value={oldPsd} onChange={e => { setOldPsd(e.target.value) }} />

						<p>Enter new password</p>
						<input type="text" value={newPsd} onChange={e => { setNewPsd(e.target.value) }} /><br />

						<p>Conform new password</p>
						<input type="text" value={confirmNewPsd} onChange={e => { setConfirmNewPsd(e.target.value) }} />

						<div className="buttons flex gap-10 justify-center">
							<button className={`cancel`} onClick={handelCancel}>Cancel</button>
							<button className={`saveBtn`} onClick={handelUpdate}>Save</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChangePassword;
