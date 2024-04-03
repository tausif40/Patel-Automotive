import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { categoryUrl, subCategoryUrl, productUrl } from "../../../app.url";
import "./addProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowBackUp } from "react-icons/tb";

function UpdateProduct() {
	const navigate = useNavigate();
	const params = useParams();
	const id = params._id;
	const [ catList, setCatList ] = useState([]);
	const [ subCatList, setSubCatList ] = useState([]);

	// form data
	const [ catName, setCatName ] = useState();
	const [ subCatName, setSubCatName ] = useState();
	const [ productName, setProductName ] = useState();
	const [ price, setPrice ] = useState();
	const [ model, setModel ] = useState('');
	const [ loadingCapacity, setLoadingCapacity ] = useState('');
	const [ mileageSeatingCapacity, setMileageSeatingCapacity ] = useState('');
	const [ countryOrigin, setCountryOrigin ] = useState('');
	const [ dimension, setDimension ] = useState('');
	const [ chargingTime, setChargingTime ] = useState('');
	const [ batteryType, setBatteryType ] = useState('');
	const [ batteryCapacity, setBatteryCapacity ] = useState('');
	const [ motorType, setMotorType ] = useState('');
	const [ image, setImage ] = useState();
	const [ productAdd, setProductAdd ] = useState(true);


	useEffect(() => {

		axios.get(categoryUrl + "fetch")
			.then((response) => {
				setCatList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios.get(productUrl + "fetch?_id=" + params._id)
			.then((response) => {
				let update = response.data[ 0 ];
				setCatName(update.category)
				setSubCatName(update.subCategory)
				setProductName(update.productName)
				setPrice(update.price)
				setModel(update.modelName)
				setLoadingCapacity(update.loadingCapacity)
				setCountryOrigin(update.countryOrigin)
				setDimension(update.dimension)
				setChargingTime(update.chargingTime)
				setBatteryType(update.batteryType)
				setBatteryCapacity(update.batteryCapacity)
				setMotorType(update.motorType)
				setImage(update.piconnm[ 0 ])
			})
			.catch((error) => { console.log(error) });
	}, [])

	const fetchSubCategory = (catnm) => {
		setCatName(catnm);
		axios.get(subCategoryUrl + "fetch?catnm=" + catnm)
			.then((response) => {
				setSubCatList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handelFile = (event) => {
		setImage(event.target.files[ 0 ])
	}
	// const handleFiles = (event) => {
	// 	setImages([ ...event.target.files ]);
	// }


	const handleUpdate = (e) => {
		e.preventDefault();

		if (!catName) {
			toast.error('Category name is required');
			return;
		}
		if (!subCatName) {
			toast.error('SubCategory name is required');
			return;
		}
		if (!productName) {
			toast.error('Product name is required');
			return;
		}
		if (!price) {
			toast.error('Price is required');
			return;
		}
		if (!image) {
			toast.error('one image is required');
			return;
		}


		const updateProduct = {
			condition_obj: { _id: id },
			content_obj: { productName: productName, price: price, category: catName, subCategory: subCatName, modelName: model, loadingCapacity: loadingCapacity, mileageSeatingCapacity: mileageSeatingCapacity, countryOrigin: countryOrigin, dimension: dimension, chargingTime: chargingTime, batteryType: batteryType, batteryCapacity: batteryCapacity, motorType: motorType, piconnm: [ image ] }
		};

		console.log(updateProduct);
		const config = {
			'content-type': 'multipart/form-data'
		};

		axios.patch(productUrl + 'update', updateProduct, config)
			.then(response => {
				toast.success('Product Updated Successfully.', {
					autoClose: 600,
				});
				setProductAdd(!productAdd);
			}).catch(error => {
				console.log(error)
				toast.error("Product Update failed.", {
					autoClose: 600,
				});
			});
	};


	function handleKeyDown(e, nextFieldId, prevFieldId) {
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			e.preventDefault();
			const nextField = document.getElementById(nextFieldId);
			if (nextField) {
				nextField.focus();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevField = document.getElementById(prevFieldId);
			if (prevField) {
				prevField.focus();
			}
		}
	}

	return (
		<>
			<div className="py-24">
				<div className="mb-8 container">
					<center className="mt-2 underline"><h3 >Update Product</h3></center>
				</div>
				<div className="addProduct-section container">
					<div className="update-productInfo textColor">
						<form>
							<div className="selectCategory-section flex gap-16">
								<div className="selectCategory-field w-1/2">
									<label htmlFor="">Select Category <span className="required">&nbsp;*</span></label>
									<br />
									<select className="selectCategory" value={catName} onChange={(e) => fetchSubCategory(e.target.value)}>
										<option selected disabled> Select one </option>
										{catList.map((row) => (
											<option>{row.catnm}</option>
										))}
									</select>
								</div>
								<div className="selectCategory-field w-1/2">
									<label htmlFor="">Select SubCategory  <span className="required">&nbsp;*</span></label>
									<br />
									<select className="selectCategory" value={subCatName} onChange={(e) => setSubCatName(e.target.value)} >
										<option selected disabled> Select one </option>
										{subCatList.map((row) => (
											<option>{row.subcatnm}</option>
										))}
									</select>
								</div>
							</div>
							<div className="name-price-field flex gap-16">
								<div className="form-field">
									<label htmlFor="pname">Product name  <span className="required">&nbsp;*</span></label>
									<input type="text" id="pname" value={productName} onChange={e => { setProductName(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'price', 'pname')} />
								</div>
								<div className="form-field">
									<label htmlFor="price">Product Price  <span className="required">&nbsp;*</span></label>
									<input type="number" id="price" value={price} onChange={e => { setPrice(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name0', 'pname')} />
								</div>
							</div>
							<div className="Specification-section py-2">
								<p className="mb-2 px-4 font-bold">Specification Details :-</p>

								<div className="flex items-center table-input">
									<label htmlFor="name0">Model Name / Number</label>
									<input type="text" id="name0" value={model} onChange={e => { setModel(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name1', 'price')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name1">Loading Capacity</label>
									<input type="text" id="name1" value={loadingCapacity} onChange={e => { setLoadingCapacity(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name2', 'name0')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name2">Mileage Seating Capacity</label>
									<input type="text" id="name2" value={mileageSeatingCapacity} onChange={e => { setMileageSeatingCapacity(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name3', 'name1')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name3">Country Origin</label>
									<input type="text" id="name3" value={countryOrigin} onChange={e => { setCountryOrigin(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name4', 'name2')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name4">Dimension</label>
									<input type="text" id="name4" value={dimension} onChange={e => { setDimension(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name5', 'name3')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name5">Charging Time</label>
									<input type="text" id="name5" value={chargingTime} onChange={e => { setChargingTime(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name6', 'name4')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name6">Battery Type</label>
									<input type="text" id="name6" value={batteryType} onChange={e => { setBatteryType(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name7', 'name5')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name7">Battery Capacity</label>
									<input type="text" id="name7" value={batteryCapacity} onChange={e => { setBatteryCapacity(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name8', 'name6')} />
								</div>
								<div className="flex items-center table-input">
									<label htmlFor="name8">Motor Type</label>
									<input type="text" id="name8" value={motorType} onChange={e => { setMotorType(e.target.value) }} onKeyDown={(e) => handleKeyDown(e, 'name8', 'name7')} />
								</div>
							</div>
							<div className="image-section my-8">
								{/* <ImageUploader /> */}
								<input type="file" accept="image/*" multiple onChange={handelFile} />
							</div>
							<center>
								<button
									type="button"
									onClick={handleUpdate}
									className="adminSubmitBtn py-2 px-4 mt-8 text-white rounded-md transition duration-200 bg-themeColor hover:bg-themeDark"
								>
									Update Product</button>
							</center>
						</form>
						<button className="relative bottom-10 flex items-center bg-gray-300 font-medium py-2 px-4 rounded-md transition duration-200 hover:bg-gray-400" onClick={() => { navigate(-1) }}> <TbArrowBackUp size={18} /> Back</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateProduct