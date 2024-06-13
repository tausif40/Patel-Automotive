import React, { useEffect, useState, useRef, useCallback } from 'react'
import './savedItem.css';
import { GoHeart } from "react-icons/go";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { productUrl } from '../../../app.url';
import axios from 'axios';
import ProductImages from '../Product/ProductDetails/ProductGallery/productImages';
import { RxCross2 } from "react-icons/rx";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishlistUrl } from '../../../app.url';
import Loader from '../Loader/loader';

function SavedItem() {
	const [ product, setProduct ] = useState([]);
	const [ noProduct, setNoProduct ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ popup, setPopup ] = useState(false);
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

	const removeProduct = (id) => {
		const product = { data: { productId: id } };
		axios.delete(wishlistUrl + 'delete', product)
			.then((response) => {
				toast.success("remove successfully", { autoClose: 500 });
			}).catch((error) => {
				// console.log(error);
			})
	}

	useEffect(() => {
		let productId = [];
		const user_token = localStorage.getItem('user_token');

		setIsLoading(true);
		axios.get(wishlistUrl + 'fetch?user_token=' + user_token)
			.then((response) => {
				if (response.data.length === 0) {
					setIsLoading(false);
					setNoProduct(true);
				} else {
					console.log(response.data);
					response.data.forEach(item => {
						productId.push(item.productId);
					})
				}
			}).then(() => {
				axios.post(productUrl + 'fetchWishlist', { productId })
					.then(response => {
						setIsLoading(false);
						setNoProduct(false);
						setProduct(response.data.wishlist);
					})
					.catch(error => {
						if (error.response.status == 404) {
							setNoProduct(true);
						}
						console.log(error);
					})

			}).catch((error) => {
				console.log(error);
			})
		setIsLoading(false);
	}, [ removeProduct ]);


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

	if (isLoading) {
		return <div className='h-[70vh] pt-24'><Loader /></div>
	} else if (noProduct) {
		return <div className='pt-24 flex justify-center items-center'>
			<img src="/assets/images/no-save-item.png" alt="No Save Item" className='size-80 pb-20 object-contain' />
		</div>
	}

	return (
		<>
			<div className='pt-24'></div>
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
								<div className='product-data flex gap-8 flex-col'>
									<div>
										<p className='price-section textColor'>Price<span className='symbol'>&nbsp;&#8377;&nbsp;</span>
											<span className='price'>{(value.price).toLocaleString("en-IN")}</span>
										</p>
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
									<button className='remove-btn'><div className='flex justify-center content-center' onClick={() => { removeProduct(value._id) }}><p className='pt-1'></p>Remove</div></button>
									<button className='moreDetails-btn' onClick={() => { setPopup(true) }}>More details...</button>
								</div>
							</div>
						</div>
					</div>
				))
			}
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
										<label for="name" className="block mb-2 mt-6 text-sm font-medium text-white">Your Name</label>
										<input type="text" name="from_name" id="name" className="text-gray-900 bg-gray-200 border-b-2 border-gray-500  text-lg focus:border-themeColor2 block w-full p-2 " required onChange={(e => { setNameError('') })} />
										<div className="h-[14px] text-[#d45959] text-sm font-normal pl-1">{nameError}</div>
									</div>
									<div>
										<label for="number" className="block mb-2 text-sm font-medium text-white">Phone number</label>
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
export default SavedItem;