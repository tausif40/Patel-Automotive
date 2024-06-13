import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./component/User/ScrollToTop/scrollToTop";
import Navbar from "./component/User/Navbar/navbar";
import Login from "./component/User/Login/login";
import Register from "./component/User/Register/register";
import Profile from "./component/User/Profile/profile";
import Banner from "./component/User/Banner/banner";
import Product from "./component/User/Product/HighlightProduct/product";
import AllProducts from "./component/User/Product/AllProducts/allProducts";
import ProductDetails from "./component/User/Product/ProductDetails/productDetails";
import AboutShowroom from "./component/User/About/Showroom/aboutShowroom";
import AboutOwner from "./component/User/About/Owner/aboutOwner";
import Contact from "./component/User/Contact/contact";
import SavedItem from "./component/User/SavedItem/saveItem";
import EditProfile from "./component/User/Profile/EditProfile/editProfile";
import Address from "./component/User/Address/address";
import BackToTopButton from "./component/User/BackToTop/backToTop";
import Footer from "./component/User/Footer/footer";
import PageNotFound from "./component/User/PageNotFound/pageNotFound";

// admin
import AdminHome from "./component/Admin/adminHome/adminHome";
import UserDetails from "./component/Admin/UserDetails/userDetails";
import AddProduct from "./component/Admin/ProductOption/addProduct";
import AddCategory from "./component/Admin/CategoryOption/addCategory";
import DeleteCategory from "./component/Admin/CategoryOption/DeleteCategory";
import UpdateCategory from "./component/Admin/CategoryOption/updateCategory";
import AddSubCategory from "./component/Admin/SubCategoryOption/addSubCategory";
import DeleteSubCategory from "./component/Admin/SubCategoryOption/deleteSubCategory";
import UpdateSubSubCategory from "./component/Admin/SubCategoryOption/updateSubCategory";
import UpdateProduct from "./component/Admin/ProductOption/updateProduct";

function App() {
	
	return (
		<>
			<ScrollToTop />
			<Navbar />
			<Routes>
				<Route path="/"
					element={
						<React.Fragment>
							<Banner />
							<Product />
							<AboutShowroom />
							<AboutOwner />
							<Contact />
							<Address />
							<Footer />
						</React.Fragment>
					}
				/>
				<Route path="/home"
					element={
						<React.Fragment>
							<Banner />
							<Product />
							<AboutShowroom />
							<AboutOwner />
							<Contact />
							<Address />
							<Footer />
						</React.Fragment>
					}
				/>
				<Route
					path="/allProducts"
					element={
						<React.Fragment>
							<AllProducts />
							<Address />
							<Footer />
						</React.Fragment>
					}
				/>
				<Route
					path="/allProducts/:subCategory"
					element={
						<React.Fragment>
							<AllProducts />
							<Address />
							<Footer />
						</React.Fragment>
					}
				/>
				<Route path="/savedItem" element={<SavedItem />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/profile/editProfile" element={<EditProfile />}></Route>
				<Route path="/productDetails" element={<ProductDetails />}></Route>
				<Route path="/*" element={<PageNotFound />}></Route>

				{/* admin */}
				<Route path="/admin" element={<AdminHome />}></Route>
				<Route path="/admin/home" element={<AdminHome />}></Route>
				<Route
					path="/admin/addCategory"
					element={
						<React.Fragment>
							<AddCategory />
							<DeleteCategory />
							<UpdateCategory />
						</React.Fragment>
					}
				/>
				<Route
					path="/admin/addSubCategory"
					element={
						<React.Fragment>
							<AddSubCategory />
							<DeleteSubCategory />
							<UpdateSubSubCategory />
						</React.Fragment>
					}
				/>

				<Route path="/admin/userDetails" element={<UserDetails />}></Route>
				<Route path="/admin/addProduct" element={<AddProduct />}></Route>
				<Route path="/admin/profile" element={<Profile />}></Route>
				<Route path="admin/editProfile" element={<EditProfile />}></Route>
				<Route path="/admin/product/updateProduct/:_id" element={<UpdateProduct />}></Route>
			</Routes>

			<BackToTopButton />
		</>
	);
}

export default App;
