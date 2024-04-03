import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { userUrl } from "../../../app.url";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

function Login() {
	const navigate = useNavigate();
	const [ phone, setPhone ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState("");

	const [ showPassword, setShowPassword ] = useState('password');
	const [ psdIcon, setPsdIcon ] = useState(<GoEyeClosed size={20} />);

	const handelPasswordIcon = () => {
		if (showPassword === 'password') {
			setShowPassword('text');
			setPsdIcon(<GoEye size={20} />);
		} else {
			setShowPassword('password');
			setPsdIcon(<GoEyeClosed size={20} />);
		}
	}

	const handelLogin = (e) => {
		e.preventDefault();

		const loginInfo = { phone: phone, password: password };
		axios
			.post(userUrl + "login", loginInfo)
			.then((response) => {
				const obj = response.data.userDetails;

				if (obj.status == 1) {
					toast.success("Login Successfully", { autoClose: 600 });
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("user_token", obj.user_token);
					localStorage.setItem("_id", obj._id);
					localStorage.setItem("status", obj.status);
					localStorage.setItem("role", obj.role);
				} else {
					toast.error("Login failed !!");
				}
				if (obj.status == 1 && obj.role === "admin") {
					navigate("/admin/home");

				} else {
					navigate("/");
				}
			})
			.catch((error) => {
				setError("Invalid phone number or password.");
				toast.error("Login failed.. !", {
					autoClose: 600,
				});
			});
	};

	function handleKeyDown(e, nextFieldId, prevFieldId) {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (nextFieldId === 'login') {
				handelLogin(e);
			} else {
				const nextField = document.getElementById(nextFieldId);
				if (nextField) {
					nextField.focus();
				}
			}
		} else if (e.key === 'Enter' || e.key === 'ArrowDown') {
			e.preventDefault();
			const nextField = document.getElementById(nextFieldId);
			if (nextField) {
				nextField.focus();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevField = document.getElementById(prevFieldId);
			if (prevField) {
				prevField.focus();
			}
		}
	}

	return (
		<>
			<div className="login-section">
				<div className="login-form-img">
					<img src="/assets/images/loginFormIng.jpg" alt="image-here" />
				</div>
				<div className="login-main">
					<div className="login-header">
						<h2 className="">Login Here !</h2>
					</div>
					<form className="login-form-field" onSubmit={handelLogin}>
						<div className="login-form-input">
							<div className="login-error-msg">{error}</div>
							<input
								type="text"
								id="phone"
								className="input"
								placeholder="Phone Number"
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
									let value = e.target.value;
									if (value.startsWith("+91")) {
										value = value.substring(3);
									}
									setPhone(value);
									setError("");
								}}
								onKeyDown={(e) => handleKeyDown(e, 'password', 'phone')}
							/>
						</div>
						<div className="login-form-input">
							<input
								type={showPassword}
								id="password"
								className="input"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setError("");
								}}
								onKeyDown={(e) => handleKeyDown(e, 'login', 'phone')}
							/>
							<span className="relative float-right top-[-30px] right-4 text-gray-800 cursor-pointer" onClick={handelPasswordIcon}>{psdIcon}</span>

						</div>

						<Link to={"/register"}>
							<p className="register-link">Create new account</p>
						</Link>
						<br />
						<center>
							<button className="login-btn" id="login" onKeyDown={(e) => handleKeyDown(e, 'password', 'password')}>Login</button>
						</center>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
