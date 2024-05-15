import React, { useEffect, useState } from "react";
import "./adminNav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { userUrl } from '../../../app.url';
// import axios from 'axios';
import Auth from "../../User/AuthComponent/Auth";


function AdminNav() {

	// const navigate = useNavigate();
	const [ menu, setMenu ] = useState("mobile-menu");
	const [ hamburger, setHamburger ] = useState(null);
	// const [ NavContent, setNavContent ] = useState();
	// const [ changeNav, setChangeNav ] = useState(false);
	// const [ admin, setAdmin ] = useState('');

	// const token = localStorage.getItem("token")
	// const user_token = localStorage.getItem("user_token")

	// useEffect(() => {
	// 	if (token === "null" || user_token === "null" || token === '' || user_token === '') {
	// 		localStorage.clear();
	// 		navigate("/login");

	// 	} else if (user_token != null) {
	// 		axios.get(userUrl + "fetch?user_token=" + user_token)
	// 			.then((response) => { setAdmin(response.data[ 0 ].role) });
	// 	}
	// })

	const handelMenu = () => {
		menu === "mobile-menu" ? setMenu(null) : setMenu("mobile-menu");
		setHamburger(hamburger === "hamburger-effect" ? null : "hamburger-effect");
	};
	const handelHide = () => {
		setMenu("mobile-menu");
		setHamburger(null);
	};
	// useEffect(() => {
	// 	fetchUserRole();
	// }, []);


	return (
		<>
			<Auth />
			<div className="nav-section">
				<nav className="nav-bar flex fixed">
					<div className="logo-name flex items-center">
						<Link to="home" smooth={true} offset={-25} duration={800}>
							<NavLink to={"/admin/home"}>
								<img
									src="/assets/images/logo.png"
									alt="logo"
									className="size-10"
								/>
							</NavLink>
						</Link>
						<NavLink to={"/admin/home"}>
							<h1 className="logo-text-shadow">Patel Automotive</h1>
						</NavLink>
					</div>
					<div>
						<div
							className={`mobile-menu-page ${menu}`}
							onClick={handelMenu}
						></div>
						<ul className={`nav-option flex ${menu}`}>
							<Link
								to="home"
								smooth={true}
								offset={0}
								duration={800}
								className="adminHome"
							>
								<NavLink to={"/admin/home"} id="linkStyle" className={({ isActive }) =>
									`${isActive ? "activeLink" : "nav-option-color"}`}>
									<li onClick={handelHide}>Home</li>
								</NavLink>
							</Link>

							<NavLink to={"/admin/userDetails"} id="linkStyle" className={({ isActive }) =>
								`${isActive ? "activeLink" : "nav-option-color"}`}>
								<li onClick={handelHide}>User Details</li>
							</NavLink>

							<NavLink to={"/admin/addCategory"} id="linkStyle" className={({ isActive }) =>
								`${isActive ? "activeLink" : "nav-option-color"}`}>
								<li onClick={handelHide}>Category Opt</li>
							</NavLink>
							<NavLink to={"/admin/addSubCategory"} id="linkStyle" className={({ isActive }) =>
								`${isActive ? "activeLink" : "nav-option-color"}`}>
								<li onClick={handelHide}>Subcategory Opt</li>
							</NavLink>

							<NavLink to={"/admin/addProduct"} id="linkStyle" className={({ isActive }) =>
								`${isActive ? "activeLink" : "nav-option-color"}`}>
								<li onClick={handelHide}>Product Opt</li>
							</NavLink>

							<NavLink to={"/admin/profile"} id="linkStyle">
								<li className="login">Profile</li>
							</NavLink>
						</ul>
					</div>
					<div className={`hamburger ${hamburger}`} onClick={handelMenu}>
						<GiHamburgerMenu size={30} />
					</div>
				</nav>
			</div>
		</>
	)
}

export default AdminNav;