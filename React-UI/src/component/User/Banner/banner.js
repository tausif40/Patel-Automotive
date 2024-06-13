import React from 'react'
import './banner.css'
import { Link, useNavigate } from 'react-router-dom';

function Banner() {
	const navigate = useNavigate()
	return (
		<>
			<section className="banner-section flex items-center justify-center pt-2" id='home'>
				<div className='banner container flex pt-10'>
					<div>
						<div className='banner-img'>
							<img src="/assets/images/banner-erickshaw.png" alt="img" />
						</div>
						<button className='mobile-btn shop-button mt-14' onClick={() => { navigate('/allProducts') }}>SHOP NOW</button>
					</div>

					<div className='banner-text text-white w-3/5 pl-20'>
						<div className='banner-text-section h-56'>
							<p className='banner-heading font-bold text-6xl rise leading-[1.1]'>Patel <br /> Automotive <br /></p>
							<p className='tagLine text-lg mt-2 font-extralight italic'>Best E -rickshaw in indore</p>
						</div>
						<p className='banner-text'>"Explore the future of eco-friendly commuting at <b className='tracking-widest'>Patel-Automotive</b> E-Rickshaw showroom! Drive green, drive smart."</p>
						<center>
							<Link to={'/allProducts'}>
								<button className='desktop-btn shop-button mt-14'>SHOP NOW</button>
							</Link>
						</center>
					</div>
				</div>
			</section >
		</>
	)
}

export default Banner;