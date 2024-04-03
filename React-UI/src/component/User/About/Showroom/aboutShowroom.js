import React, { useEffect } from 'react';
import './aboutShowroom.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { showroomImg } from '../../../../data/database';
import Aos from 'aos'
import 'aos/dist/aos.css'

function AboutShowroom() {
	useEffect(() => {
		Aos.init({ duration: 1000 })
	}, []);
	return (
		<>
			<section className="aboutShowroom-section" id='aboutShowroom'>
				<div className="info flex justify-between flex-col">
					<div>
						<div className="about-paragraph">
							<h2>About our Showroom</h2>
							<p>"Welcome to Patel Automotive, your trusted destination for cutting-edge e-rickshaw solutions in Indore. Nestled on LIG Link Road,  Indore. Our showroom stands as a beacon of innovation and reliability in the realm of electric mobility.
								At Patel Automotive, we pride ourselves on being more than just a dealership; we're your partners in sustainable transportation. With a dedicated focus on customer satisfaction, we offer a comprehensive range of e-rickshaw models, including passenger vehicles, loaders, and delivery vans. Our commitment to quality ensures that each vehicle meets the highest standards of performance, safety, and durability.
								Beyond just selling e-rickshaws, we provide end-to-end support, from expert guidance in choosing the right model to after-sales service and maintenance. Whether you're a commuter, a business owner, or a logistics professional, Patel Automotive is here to meet your needs with professionalism and expertise.
								Step into our showroom today and experience the future of transportation with Patel Automotive. Let's embark on a journey towards greener, cleaner, and more efficient mobility together."</p>
						</div>
					</div>

					<div className="carousel-section flex" data-aos="zoom-in">
						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							// autoplay={{ delay: 4000, disableOnInteraction: false, }}
							pagination={{ clickable: true, }}
							navigation={true}
							zoom={true}
							modules={[ Autoplay, Pagination, Navigation, EffectFade ]}
							className="mySwiper"
						>
							{
								showroomImg.map((value) => (
									<SwiperSlide>
										<img src={value.img} alt="img-break" className='slider-img' />
									</SwiperSlide>
								))
							}

						</Swiper>
					</div>
				</div>
			</section>
		</>
	)
}

export default AboutShowroom;