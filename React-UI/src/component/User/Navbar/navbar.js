import React, { useEffect, useState } from "react";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { userUrl } from '../../../app.url';
import axios from 'axios';
import Auth from "../AuthComponent/Auth";

function NavBar() {
	const navigate = useNavigate();
	const [ menu, setMenu ] = useState("mobile-menu");
	const [ hamburger, setHamburger ] = useState(null);
	const [ isLogin, setIsLogin ] = useState()

	const [ userRole, setUserRole ] = useState();

	let token = localStorage.getItem("token")
	let user_token = localStorage.getItem("user_token")


	useEffect(() => {

		if (token === null) {
			setIsLogin(
				<NavLink to={"/login"} id="linkStyle" activeclassname="activeLink">
					<li className="login">Login</li>
				</NavLink>
			)
		}

		if (token === "null" || user_token === "null" || token === '' || user_token === '') {
			localStorage.clear();
			navigate("/login");

		} else if (user_token != null) {
			axios.get(userUrl + "fetch?user_token=" + user_token)
				.then((response) => {
					setUserRole(response.data[ 0 ].role)
					setIsLogin(
						<NavLink to={"/profile"} id="linkStyle" activeclassname="activeLink">
							<li className="login"> Profile </li>
						</NavLink>
					)

				}).catch((error) => {
					if (error.response.status === 500) {
						localStorage.clear();
						navigate("/login");
					}
				});
		}

	}, [ user_token, token ]);

	const handelHide = () => {
		setMenu("mobile-menu");
		setHamburger(null);
	};

	return (
		<>
			<Auth />
			{userRole === 'admin' ? (
				<header>
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
									onClick={() => {
										setMenu("mobile-menu");
										setHamburger(null);
									}}
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
							<div className={`hamburger ${hamburger}`}
								onClick={() => {
									menu === 'mobile-menu' ? setMenu(null) : setMenu('mobile-menu')
								}}>
								<GiHamburgerMenu size={30} />
							</div>
						</nav>
					</div>
				</header>
			) :
				(
					<header>
						<div className="nav-section">
							<nav className="nav-bar flex fixed">
								<div className="logo-name flex items-center">
									<Link to="home" smooth={true} offset={-25} duration={800}>
										<NavLink to={"/"}>
											<img
												src="/assets/images/logo.png"
												alt="logo"
												className="size-10"
											/>
										</NavLink>
									</Link>
									<NavLink to={"/"}>
										<h1 className="logo-text-shadow">Patel Automotive</h1>
									</NavLink>
								</div>
								<div>
									<div
										className={`mobile-menu-page ${menu}`}
										onClick={() => {
											setMenu("mobile-menu");
											setHamburger(null);
										}}
									></div>
									<ul className={`nav-option flex ${menu}`}>
										<Link to="home" smooth={true} offset={-25} duration={800}>
											<NavLink to={"/home"} id="linkStyle" className={({ isActive }) =>
												`${isActive ? "activeLink" : "nav-option-color"}`}>
												<li onClick={handelHide}>Home</li>
											</NavLink>
										</Link>
										<NavLink to={"/allProducts"} id="linkStyle" className={({ isActive }) =>
											`${isActive ? "activeLink" : "nav-option-color"}`}>
											<li onClick={handelHide}>E-Rickshaw</li>
										</NavLink>
										<Link
											to="aboutShowroom"
											smooth={true}
											offset={-30}
											duration={800}
										>
											<NavLink to={"/"} id="linkStyle" activeclassname="activeLink">
												<li onClick={handelHide}>About</li>
											</NavLink>
										</Link>
										<Link
											to="aboutOwner"
											smooth={true}
											offset={20}
											duration={800}
										>
											<NavLink to={"/"} id="linkStyle" activeclassname="activeLink">
												<li onClick={handelHide}>Owner</li>
											</NavLink>
										</Link>
										<Link to="contact" smooth={true} offset={-40} duration={800}>
											<NavLink to={"/"} id="linkStyle" activeclassname="activeLink">
												<li onClick={handelHide}>Contact</li>
											</NavLink>
										</Link>
										{localStorage.getItem("token") != undefined ? (
											<NavLink to={"/savedItem"} id="linkStyle" className={({ isActive }) =>
												`${isActive ? "activeLink" : "nav-option-color"}`}>
												<li className="wishlist flex gap-1 items-center"><div> Saved item </div></li>
											</NavLink>
										) : (
											<NavLink to={"/login"} id="linkStyle" activeclassname="activeLink">
												<li className="wishlist flex gap-1 items-center"><div> Saved item </div></li>
											</NavLink>
										)}
										{isLogin}

									</ul>
								</div>
								<div className={`hamburger ${hamburger}`}
									onClick={() => {
										menu === 'mobile-menu' ? setMenu("") : setMenu('mobile-menu')
									}}>
									<GiHamburgerMenu size={30} />
								</div>
							</nav>
						</div>
					</header>
				)}
		</>
	)
}

export default NavBar;