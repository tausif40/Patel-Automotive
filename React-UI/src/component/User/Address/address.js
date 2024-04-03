import React from 'react';
import './address.css';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";


function Address() {
	return (
		<>
			<div className="address_section">
				<div className='location container flex'>
					<div className='map'>
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.8394274051698!2d75.89905809999999!3d22.734208900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdb18b5671df%3A0x73de33617d0c0388!2sPatel%20Automotive!5e0!3m2!1sen!2sin!4v1710506004160!5m2!1sen!2sin" style={{ border: '10' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>

					<div className='contact-info'>
						<div className='address flex items-start text-lg'>
							<IoLocationSharp size={30} />&nbsp;&nbsp;
							<Link to={"https://maps.app.goo.gl/jfuzW9RN187hhd4q8"} target='blank'>
								<p>J-5, Narsari Ke Pass Radhika Kunj, LIG Link Road, Indore (M.P.) 452010</p>
							</Link>
						</div>
						<div className='phone flex items-center text-lg py-5'>
							<IoCall size={20} />&nbsp;&nbsp;
							<a href="tel:+91 6262188911">
								<p>+91 6262188911</p>
							</a>
						</div>
						<div className='email flex items-center text-lg'>
							<IoIosMail size={22} />&nbsp;&nbsp;
							<p>patelautomotive1@gmail.com</p>

						</div>
						<div className='social-icon flex pt-10 gap-8 pl-6'>
							<div className='cursor-pointer'>
								<Link to={"https://www.instagram.com/patelautomotive?igsh=YjFuZXhlZ3NvM3hi"} target='blank'>
									<img src="/assets/images/instagram.png" alt="instagram" className='socialIcons' />
								</Link>
							</div>
							<div className='cursor-pointer'>
								<Link to={"https://wa.me/916262188911"} target='blank'>
									<img src="/assets/images/whatsapp.png" alt="whatsapp" className='socialIcons' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Address;