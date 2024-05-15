import React, { useEffect } from 'react'
import './product.css'
import { highlight_erickshaw } from '../../../../data/database'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom';

function Product() {

	useEffect(() => {
		Aos.init({ duration: 1000 })
	}, []);

	return (
		<>
			<section className='container pt-14 Highlight-product-section' id='product'>
				<div className='text-center textColor'>
					<h1 className='font-semibold'>Our Product</h1>
					<p>Drive green, drive smart!</p>
				</div>

				{
					highlight_erickshaw.map((value) => (
						<div className='Highlight-product'>
							{/* Fist product */}
							<div className='product-section mt-16 flex justify-between items-start'>
								<div className='product-img w-[38%] h-auto flex col items-center'>
									<div className='product-background' data-aos="fade-right"></div>
									<img src={value.product1.img} alt="img" className='product-img mt-20' data-aos="fade-right" />
								</div>

								<div className='product-details w-[55%] pt-24' data-aos="fade-left">
									<div className=''>
										<div className='flex justify-between items-center'>
											{/* <div className='line'></div> */}
											<p className='pName font-bold text-left textColor'>{value.product1.name}</p>
										</div>
										<p className='description mt-8 text-[1rem] leading-6 tracking-wide textColor' dangerouslySetInnerHTML={{ __html: value.product1.description }}></p>
									</div>

									<div className='price-details flex justify-between items-center pt-12 pr-10'>
										<Link to={`/allProducts`}>
											<button className='primary-button'>Show Details</button>
										</Link>
										<p className='price-section textColor'>Price<span className='symbol'>&nbsp;&#8377;&nbsp;</span><span className='price'>{value.product1.price.toLocaleString("en-IN")}</span></p>
									</div>
								</div>
							</div>

							<div className="divider"></div>

							{/* second product */}
							<div className='product-section mt-28 flex justify-between items-start flex-row-reverse'>
								<div className='product-img w-[38%] h-auto flex col items-center'>
									<div className='second-product-background' data-aos="fade-left"></div>
									<img src={value.product2.img} alt="img" className='product-img mt-20' data-aos="fade-left" />
								</div>

								<div className='product-details w-[55%] pt-20' data-aos="fade-right">
									<div className=''>
										<div className='flex justify-between items-center'>
											{/* <div className='line'></div> */}
											<p className='pName font-bold text-left textColor'>{value.product2.name}</p>
										</div>
										<p className='description mt-8 text-[1rem] leading-6 tracking-wide textColor' dangerouslySetInnerHTML={{ __html: value.product2.description }}></p>
									</div>

									<div className='price-details flex justify-between items-center pt-12 pr-10'>
										<Link to={`/allProducts`}>
											<button className='primary-button'>Show Details</button>
										</Link>
										<p className='price-section textColor'>Price<span className='symbol'>&nbsp;&#8377;&nbsp;</span><span className='price'>{value.product2.price.toLocaleString("en-IN")}</span></p>
									</div>
								</div>
							</div>

							<div className="divider"></div>

							{/* third product */}

							<div className='product-section mt-32 flex justify-between items-start'>
								<div className='product-img w-[38%] h-auto flex col items-center'>
									<div className='product-background' data-aos="fade-right"></div>
									<img src={value.product3.img} alt="img" className='product-img mt-20' data-aos="fade-right" />
								</div>

								<div className='product-details w-[55%] pt-20' data-aos="fade-left">
									<div className=''>
										<div className='flex justify-between items-center'>
											{/* <div className='line'></div> */}
											<p className='pName font-bold text-left textColor'>{value.product3.name}</p>
										</div>
										<p className='description mt-8 text-[1rem] leading-6 tracking-wide textColor' dangerouslySetInnerHTML={{ __html: value.product3.description }}></p>
									</div>

									<div className='price-details flex justify-between items-center pt-12 pr-10'>
										<Link to={`/allProducts`}>
											<button className='primary-button'>Show Details</button>
										</Link>
										<p className='price-section textColor'>Price<span className='symbol'>&nbsp;&#8377;&nbsp;</span><span className='price'>{value.product3.price.toLocaleString("en-IN")}</span></p>
									</div>
								</div>
							</div>
						</div>
					))
				}
				<center>
					<Link to={'/allProducts'}>
						<button className='View-More-btn mt-32 mb-24'>View More</button>
					</Link>
				</center>
			</section>
		</>
	)
}

export default Product;