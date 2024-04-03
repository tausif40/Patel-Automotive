import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { categoryUrl, subCategoryUrl } from "../../../app.url";
import "./updateSubCategory.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateSubCategory() {
	const navigate = useNavigate();
	const [ catList, setCatList ] = useState([]);
	const [ catName, setCatName ] = useState();
	const [ subCatList, setSubCatList ] = useState([]);
	const [ subCatName, setSubCatName ] = useState();
	const [ newSubCatName, setNewSubCatName ] = useState();

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

	const handelUpdateSubCategory = (event) => {
		event.preventDefault();

		let updateCategory = { condition_obj: { subcatnm: subCatName }, content_obj: { subcatnm: newSubCatName } };

		if (subCatName === undefined || subCatName === undefined) {
			toast.error("Please select SubCategory", { autoClose: 600, });
		} else {
			axios.patch(subCategoryUrl + "update", updateCategory)
				.then((response) => {
					setNewSubCatName("")
					fetchSubCategory(catName);
					toast.success("Updated Successfully.", {
						autoClose: 600,
					});
				})
				.catch((error) => {
					if (error.response.status === 404) {
						toast.error("Please select SubCategory", { autoClose: 600, });
					} else {
						toast.error("Update failed", { autoClose: 600, });
					}
				});
		}
	}

	useEffect(() => {
		axios
			.get(categoryUrl + "fetch")
			.then((response) => {
				setCatList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);


	return (
		<>
			<div className="">
				<div className="container py-20">
					<div className="productInfo textColor">
						<h3 className="underline mb-8">Update SubCategory</h3>
						<form className="UpdateSubCategory-form" onSubmit={handelUpdateSubCategory}>
							<div className="UpdateSubCategory-section flex gap-20">
								<div className="w-1/2">
									<label htmlFor="">Select Category</label>
									<br />
									<select
										className="selectCategory"
										value={catName}
										onChange={(e) => fetchSubCategory(e.target.value)}
									>
										<option selected disabled>
											Select one
										</option>
										{catList.map((row) => (
											<option>{row.catnm}</option>
										))}
									</select>
								</div>
								<div className="w-1/2">
									<label htmlFor="">Select SubCategory</label>
									<br />
									<select
										className="selectCategory"
										value={subCatName}
										onChange={(e) => setSubCatName(e.target.value)}
									>
										<option selected>
											Select one
										</option>
										{subCatList.map((row) => (
											<option>{row.subcatnm}</option>
										))}
									</select>
								</div>
							</div>
							<p className="mb-2 mt-6">Update SubCategory Name</p>
							<div className="updateCategoryInput flex w-full gap-20">
								<div className="category-input w-2/3">
									<input
										type="text"
										className=""
										value={newSubCatName}
										onChange={(e) => setNewSubCatName(e.target.value)}
										required
									/>
								</div>

								<button
									type="submit"
									className="py-2 px-4 text-white rounded-md transition duration-200 bg-themeColor hover:bg-themeDark"
								>
									Update SubCategory
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateSubCategory;
