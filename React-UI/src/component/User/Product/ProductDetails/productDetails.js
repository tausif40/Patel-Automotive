import React, { useEffect, useState, useRef } from 'react'
import './productDetails.css';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { productUrl } from '../../../../app.url';
import axios from 'axios';
import ProductImages from './ProductGallery/productImages';
import { RxCross2 } from "react-icons/rx";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../Loader/loader';
import { wishlistUrl } from '../../../../app.url';
import { LuSearch } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

function ProductDetails() {
	const params = useParams()
	const navigate = useNavigate();

	const [ product, setProduct ] = useState([]);
	const [ noProduct, setNoProduct ] = useState(false);
	const [ comingSoon, setComingSoon ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ popup, setPopup ] = useState(false);
	const [ search, setSearch ] = useState('');

	const [ nameError, setNameError ] = useState('');
	const [ phoneError, setPhoneError ] = useState('');

	const validateForm = () => {
		let valid = true;
		const formData = new FormData(form.current);

		const name = formData.get('from_name');
		if (name.length == 0) {
			setNameError('Name is required');
			valid = false;
		} else if (name.length < 3) {
			setNameError('valid Name is required');
			valid = false;
		} else if (!/^[a-zA-Z\s]*$/.test(name)) {
			setNameError('Name can only contain letters and spaces');
			valid = false;
		} else if (name.length > 30) {
			setNameError('Name is too long');
			valid = false;
		}

		let phoneNumber = formData.get('mobile_number');
		if (phoneNumber.startsWith(+91)) {
			phoneNumber = phoneNumber.substring(2);
		}
		if (phoneNumber.startsWith(0)) {
			phoneNumber = phoneNumber.substring(1);
		}
		if (!phoneNumber) {
			setPhoneError('Phone number is required!');
			valid = false;
		} else if (!/^\d{10}$/.test(phoneNumber)) {
			setPhoneError('Phone number must be 10 digits');
			valid = false;
		}
		return valid;
	};

	const handleSearch = () => {
		setNoProduct(false);
		setIsLoading(true);
		axios.get(productUrl + 'fetch').then((response) => {
			const filteredProducts = response.data.filter(item => {
				if (search === '') {
					return true;
				} else if (item.productName.toLowerCase().includes(search.toLowerCase()) ||
					item.modelName.toLowerCase().includes(search.toLowerCase()) ||
					item.category.toLowerCase().includes(search.toLowerCase()) ||
					item.subCategory.toLowerCase().includes(search.toLowerCase())) {
					return true;
				}
				return false;
			})
			setProduct(filteredProducts);
			setIsLoading(false);
			if (filteredProducts.length === 0) {
				setIsLoading(false);
				setNoProduct(true);
			}
		})
	};

	const fetchProductData = () => {
		setIsLoading(true);
		setNoProduct(false);
		if (params.subCategory === undefined) {
			axios.get(productUrl + 'fetch')
				.then(response => {
					setIsLoading(false);
					setComingSoon(false)
					setProduct(response.data);
				})
				.catch(error => {
					console.log(error);
				})
		} else if (params.subCategory != undefined) {
			axios.get(productUrl + 'fetch?category=' + params.subCategory)
				.then(response => {
					if (response.data.length === 0) {
						axios.get(productUrl + 'fetch?subCategory=' + params.subCategory)
							.then(response => {
								if (response.data.length === 0) {
									setIsLoading(false);
									setComingSoon(true)
								} else {
									setProduct(response.data);
									setComingSoon(false)
									setIsLoading(false);
								}
							})
					} else {
						setProduct(response.data);
						setComingSoon(false)
						setIsLoading(false);
					}
				})
				.catch(error => {
					console.log(error);
				})
		}
	}

	const addToWishlist = (id) => {

		const token = localStorage.getItem("user_token")
		if (token === null || token === '') {
			navigate('/login')
		} else {
			const toastId = toast.loading("Saving Product...")
			const WishlistItem = { productId: id, user_token: token }
			axios.post(wishlistUrl + "save", WishlistItem).then((res) => {
				toast.update(toastId, { render: "Saved Successfully", type: "success", isLoading: false, autoClose: 600 });
			}).catch((err) => {
				if (err.response.status === 400) {
					toast.update(toastId, { render: "Already saved", type: "info", isLoading: false, autoClose: 400 });
				} else {
					toast.update(toastId, { render: "Saving failed !", type: "error", isLoading: false, autoClose: 600 });
				}
			})
		}
	}
	const form = useRef();
	const ContactUs = (e) => {
		e.preventDefault();

		const valid = validateForm();

		if (valid) {
			const pendingToastId = toast.info("Message Sending...", { autoClose: false });
			emailjs
				.sendForm('service_lswskmh', 'template_jkso3fa', form.current, {
					publicKey: 'CJ1sRLYE-fkywg1Hn',
				})
				.then(
					() => {
						toast.update(pendingToastId, {
							render: "Message Sent Successfully",
							type: "success",
							autoClose: 800
						});
					},
					(error) => {
						toast.update(pendingToastId, {
							render: "Message Not Sent",
							type: "success",
							autoClose: 800
						});
					}
				);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSearch();
		}
	};

	useEffect(() => {
		fetchProductData();
	}, [ params.subCategory, params ]);

	if (isLoading) {
		return <div className='h-[90vh] pt-40'><Loader /></div>
	} else if (comingSoon) {
		return <>
			<button className='flex items-center absolute mt-10 ml-10 bg-slate-300 py-1 pr-4 pl-2 rounded-[4px]' onClick={() => { navigate(-1) }}><IoIosArrowBack /> &nbsp;back</button>
			<div className='flex justify-center items-center h-[90vh]'>
				<img src="/assets/images/coming-soon.jpg" alt="coming soon..." className='size-80 pb-20 object-contain' />
			</div>
		</>
	}

	return (
		<>
			<div className='searchWarper'>
				<div className="ProductSearchBar mt-5">
					<input type="search" placeholder="search Products......" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
					<div className="ProductSearchIcon" onClick={handleSearch}><LuSearch size={25} /></div>
				</div>
			</div>
			{noProduct && (
				<div className='flex justify-center pt-10 h-[80vh]'>
					<img src="/assets/images/no-result.png" alt="no result" className='size-96 pb-20 object-contain' />
				</div>
			)}
			<div className='mt-10'>
				{
					product.map((value, index) => (
						<div className='product'>
							<div className='product-card flex'>

								{/* image section */}
								<div className='product-image'>
									<ProductImages images={value.images} />
								</div>

								{/* product details section */}
								<div className='product-details-section'>
									<div className='product-name'>
										<p>{value.productName}</p>
									</div>
									<div className='product-data flex gap-6 flex-col'>
										<div>
											<p className='price-section textColor'>Price<span className='symbol'>&nbsp;&#8377;&nbsp;</span>
												<span className='price'>{(value.price).toLocaleString("en-IN")}</span>
											</p>
											<p className='Category'><b>Model Name : </b><span>{value.modelName}</span></p>
											<p className='Category'><b>Category: </b><span>{value.category} &nbsp;({value.subCategory})</span></p>
										</div>

										{/* basic details */}
										<div className="basicDetails">
											<div className='Specification'>Specification</div>
											<div className='description'>
												<div className='flex description-title'>
													<p>Loading capacity : </p>
													<p>{value.loadingCapacity}</p>
												</div>
												<div className='flex description-title'>
													<p>Mileage Seating capacity : </p>
													<p>{value.mileageSeatingCapacity}</p>
												</div>
												<div className='flex description-title'>
													<p>Country Origin : </p>
													<p>{value.countryOrigin}</p>
												</div>
												<div className='flex description-title'>
													<p>Dimension : </p>
													<p>{value.dimension}</p>
												</div>
												<div className='flex description-title'>
													<p>Charging Time : </p>
													<p>{value.chargingTime}</p>
												</div>
												<div className='flex description-title'>
													<p>Battery type : </p>
													<p>{value.batteryType}</p>
												</div>
												<div className='flex description-title'>
													<p>Battery Capacity : </p>
													<p>{value.batteryCapacity}</p>
												</div>
												<div className='flex description-title'>
													<p>Motor type : </p>
													<p>{value.motorType}</p>
												</div>
											</div>
										</div>
									</div>

									{/* buttons */}
									<div className='PD-buttons flex gap-10 justify-center'>
										<button className='wishlist-btn' onClick={() => { addToWishlist(value._id) }}>
											<div className='flex justify-center content-center'><p className='pt-1'></p>&nbsp;Save this</div>
										</button>
										<button className='moreDetails-btn' onClick={() => { setPopup(true) }}>More details...</button>
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
			{
				popup && (
					<div className='fixed left-0 top-0 w-full h-screen bg-[#22222296] z-50'>
						<div className='flex justify-center items-center pt-32'>
							<div className="w-full max-w-sm p-4 bg-[#0c2b36] border border-gray-700 rounded-sm shadow sm:p-6 md:p-8">
								<div className='text-white relative float-right top-[-20px] right-[-20px] cursor-pointer' onClick={() => { setPopup(false); setNameError(''); setPhoneError('') }}><RxCross2 size={25} /></div>
								<form className="space-y-4" ref={form} onSubmit={ContactUs}>
									<div className='m-auto'>
										<h5 className="text-xl font-medium text-white text-center">Enter name and number</h5>
										<p className="font-thin text-white text-center">I will connect you soon.</p>
									</div>
									<div>
										<label htmlFor="name" className="block mb-2 mt-6 text-sm font-medium text-white">Your Name</label>
										<input type="text" name="from_name" id="name" className="text-gray-900 bg-gray-200 border-b-2 border-gray-500  text-lg focus:border-themeColor2 block w-full p-2 " required onChange={(e => { setNameError('') })} />
										<div className="h-[14px] text-[#d45959] text-sm font-normal pl-1">{nameError}</div>
									</div>
									<div>
										<label htmlFor="number" className="block mb-2 text-sm font-medium text-white">Phone number</label>
										<input type="number" name="mobile_number" id="password" className="text-gray-900 bg-gray-200 border-b-2 border-gray-500  text-lg focus:border-themeColor2 block w-full p-2" required onChange={(e => { setPhoneError('') })} />
										<div className="h-[14px] text-[#d45959] text-sm font-normal pl-1">{phoneError}</div>
									</div>
									<div className='flex gap-4 pt-2'>
										<button type="submit" value="Send" className="w-full text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-sm text-lg px-5 py-2.5 text-center">Submit</button>
									</div>
									<div className="text-sm  font-light text-gray-300">Please enter correct info</div>
								</form>
							</div>
						</div>
					</div>)
			}
		</>
	)
}

export default ProductDetails;