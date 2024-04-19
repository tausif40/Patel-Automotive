import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { userUrl } from "../../../app.url";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";


function Register() {
	const navigate = useNavigate();

	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState(""); y

	const [ phone, setPhone ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");

	const [ nameError, setNameError ] = useState("");
	const [ emailError, setEmailError ] = useState("");
	const [ phoneNoError, setPhoneNoError ] = useState("");
	const [ passwordError, setPasswordError ] = useState("");
	const [ confirmPasswordError, setConfirmPasswordError ] = useState("");

	const [ showPassword, setShowPassword ] = useState('password');
	const [ psdIcon, setPsdIcon ] = useState(<GoEyeClosed size={20} />);

	const [ ConfShowPassword, setConfShowPassword ] = useState('password');
	const [ ConfPsdIcon, setConfPsdIcon ] = useState(<GoEyeClosed size={20} />);


	const handelPasswordIcon = () => {
		if (showPassword === 'password') {
			setShowPassword('text');
			setPsdIcon(<GoEye size={20} />);
		} else {
			setShowPassword('password');
			setPsdIcon(<GoEyeClosed size={20} />);
		}
	}
	const confHandelPasswordIcon = () => {
		if (ConfShowPassword === 'password') {
			setConfShowPassword('text');
			setConfPsdIcon(<GoEye size={20} />);
		} else {
			setConfShowPassword('password');
			setConfPsdIcon(<GoEyeClosed size={20} />);
		}
	}

	const changeStatus = (number) => {
		let updateDetails = { condition_obj: { phone: number }, content_obj: { status: 1 } };
		axios.patch(userUrl + "update", updateDetails)
			.then((response) => {

				const loginInfo = { phone: number, password: password };
				axios.post(userUrl + "login", loginInfo)
					.then((response) => {
						const obj = response.data.userDetails;
						if (obj.status == 1) {
							toast.success("Register Successfully", {
								autoClose: 500,
							});
							localStorage.setItem("token", response.data.token);
							localStorage.setItem("user_token", obj.user_token);
							localStorage.setItem("_id", obj._id);
							localStorage.setItem("status", obj.status);
							localStorage.setItem("role", obj.role);
						}
					}).catch((error) => {
						Swal.fire({
							title: "Something issue?",
							text: "Your account created successfully but some internal issue, Please login after few minutes or contact me.",
							icon: "warning"
						});
					})
			})
	}

	const handelRegister = (e) => {
		e.preventDefault();

		axios
			.get(userUrl + "/fetch?phone=" + phone)
			.then((res) => {
				setPhoneNoError("Phone number already exist, Please login");
			})
			.catch((err) => { });

		const userDetails = {
			name: name,
			email: email,
			phone: phone,
			password: password
		};

		const valid = validateForm(userDetails);

		if (valid) {
			axios
				.post(userUrl + "/save", userDetails)
				.then((response) => {
					if (response.status === 201) {
						changeStatus(phone)
						navigate("/");
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error("Register failed !");
				});
		}
	};

	const validateForm = (data) => {
		let valid = true;

		if (data.name.length < 1) {
			setNameError("Name is required");
			valid = false;
		} else if (data.name.length < 2) {
			setNameError("Valid name is required");
			valid = false;
		} else {
			setNameError("");
		}

		// Email validation
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (data.email < 10 || !emailRegex.test(email)) {
			setEmailError("Please enter valid email");
			valid = false;
		} else {
			setEmailError("");
		}

		// Phone number validation
		const phoneRegex = /^\+?91[0-9]{10}$|^[0-9]{10}$/;
		if (!phoneRegex.test(phone)) {
			setPhoneNoError("10-digit phone number is required");
			valid = false;
		} else {
			setPhoneNoError("");
		}

		// Password validation
		if (data.password.length < 9 && data.password.length > 21) {
			setPasswordError("Password must be 8 to 20 characters");
			valid = false;
		} else {
			setPasswordError("");
		}

		// Confirm password validation
		if (confirmPassword !== password) {
			setConfirmPasswordError("Passwords do not match");
			valid = false;
		} else {
			setConfirmPasswordError("");
		}

		return valid;
	};
	return (
		<>
			<div className="register-section">
				<div className="register-form-img">
					<img src="./assets/images/registerFormImg.jpg" alt="img-here" />
				</div>
				<div className="register-main">
					<div className="title">
						<h3 className="">Register Here !</h3>
					</div>
					<form className="register-form-field" onSubmit={handelRegister}>
						<div className="form-input">
							<input
								type="name"
								className="input"
								placeholder="Name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setNameError("");
								}}
							/>
							<div className="error-msg">{nameError}</div>
						</div>
						<div className="form-input">
							<input
								type="text"
								className="input"
								placeholder="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setEmailError("");
								}}
							/>
							<div className="error-msg">{emailError}</div>
						</div>
						<div className="form-input">
							<input
								type="text"
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
									setPhoneNoError("");
								}}
							/>
							<div className="error-msg">{phoneNoError}</div>
						</div>
						<div className="form-input">
							<input
								type={showPassword}
								className="input"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setPasswordError("");
								}}
							/>
							<span className="relative float-right top-[-30px] right-4 text-gray-800 cursor-pointer" onClick={handelPasswordIcon}>{psdIcon}</span>
							<div className="error-msg">{passwordError}</div>
						</div>
						<div className="form-input">
							<input
								type={ConfShowPassword}
								className="input"
								placeholder="confirm Password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									setConfirmPasswordError("");
								}}
							/>
							<span className="relative float-right top-[-30px] right-4 text-gray-800 cursor-pointer" onClick={confHandelPasswordIcon}>{ConfPsdIcon}</span>
							<div className="error-msg">{confirmPasswordError}</div>
						</div>
						<Link to={"/login"}>
							<p className="register-link">Already account. Login !</p>
						</Link>
						<br />
						<center>
							{/* <Link to={'/otpVerification'}> */}
							<button type="submit" className="register-btn">
								Register
							</button>
							{/* </Link> */}
						</center>
					</form>
				</div>
			</div>
		</>
	);
}

export default Register;
