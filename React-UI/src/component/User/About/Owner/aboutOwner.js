import React, { useEffect } from 'react'
import './aboutOwner.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function AboutOwner() {
	useEffect(() => {
		Aos.init({ duration: 1000 })
	}, []);
	return (
		<>
			<div id='aboutOwner'></div>
			<section data-aos="zoom-in-up">
				<div className='mb-32' ></div>
				<div className='owner-section'>
					<div className='text-center'>
						<h2 className='font-bold textColor'>About Owner</h2>
					</div>
					<section className='flex owner-info'>
						<div className='owner-image'>
							<img src="/assets/images/owner-img.png" alt="owner-img" className='size-full' />
						</div>
						<div className='about-owner'>
							<img src="/assets/images/quote-icon.png" alt="" className='pt-4' />
							<p className='py-4 textColor text-justify pr-4'>"At Patel Automotive, I’m Farooque Patel, the owner, I dedicated to more than just selling vehicles; he's committed to making a difference in people's lives through sustainable mobility solutions. With a personal connection to the community and a focus on customer satisfaction, Patel Automotive strives to empower individuals and businesses with eco-friendly options. Every interaction at Patel Automotive is marked by trust, reliability, and empathy, ensuring that each customer feels like a valued member of our extended family. Join us at Patel Automotive and be a part of our vision for a better, more connected future."</p>
							<h2 className='owner-name textColor float-end pr-10'>- Farooque Patel</h2>
						</div>
					</section>
				</div >
			</section>
		</>
	)
}

export default AboutOwner