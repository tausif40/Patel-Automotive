import React from 'react'
import './adminHome.css'
import { Link } from 'react-router-dom';

function AdminHome() {
	return (
		<>
			<div className='adminHome-section' id='adminHome'>
				<img src="/assets/images/admin-home.jpg" alt="img" className='adminHome-background' />
				<div className='container'>
					<h1 className='pt-24 font-medium'>Welcome to Admin panel</h1>
					<div className='adminOption mt-10'>
						<Link to={'/admin/userDetails'}><p>View User Details</p></Link>
						<br />
						<Link to={'/admin/addCategory'}><p>Category Option</p></Link>
						<br />
						<Link to={'/admin/addSubCategory'}><p>SubCategory Option</p></Link>
						<br />
						<Link to={'/admin/addProduct'}><p>Product Option</p></Link>
						<br />
						<Link to={'/admin/profile'}><p>Admin Profile</p></Link>
					</div>
				</div >
			</div >
		</>
	)
}

export default AdminHome;