import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { categoryUrl, subCategoryUrl } from "../../../app.url";
import "./deleteSubCategory.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteSubSubCategory() {
	const navigate = useNavigate();
	const [ catList, setCatList ] = useState([]);
	const [ catName, setCatName ] = useState();
	const [ subCatList, setSubCatList ] = useState([]);
	const [ subCatName, setSubCatName ] = useState();

	const fetchSubCategory = (catnm) => {
		setCatName(catnm);
		axios
			.get(subCategoryUrl + "fetch?catnm=" + catnm)
			.then((response) => {
				setSubCatList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handelDeleteSubCategory = (event) => {
		event.preventDefault();
		if (catName === undefined || subCatName === undefined) {
			toast.error("Please select SubCategory", { autoClose: 600, });
		} else {
			const deleteSubCategory = { data: { catnm: catName, subcatnm: subCatName } };
			axios.delete(subCategoryUrl + "delete", deleteSubCategory)
				.then((response) => {
					fetchSubCategory(catName);
					toast.success("Deleted Successfully.", {
						autoClose: 600,
					});
				})
				.catch((error) => {
					if (error.response.status === 404) {
						toast.error("Please select SubCategory", { autoClose: 600, });
					} else {
						toast.error("SubCategory not Deleted", { autoClose: 600, });
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
	}, [ handelDeleteSubCategory ]);


	return (
		<>
			<div className="">
				<div className="container pt-20">
					<div className="productInfo textColor">
						<h3 className="underline mb-8">Delete SubCategory</h3>
						<form className="DeleteSubCategory-form" onSubmit={handelDeleteSubCategory}>
							<p htmlFor="">Select Category</p>
							<div className="DeleteSubCategory-section ">
								<div className="selectCategory-filed w-2/3">
									<select
										className="selectCategory"
										value={catName}
										onChange={(e) => fetchSubCategory(e.target.value)}
									>
										<option selected>
											Select one
										</option>
										{catList.map((row) => (
											<option key={row.catnm}>{row.catnm}</option>
										))}
									</select>
								</div>
								<p className="mb-2 mt-6">Select SubCategory</p>
								<div className="SelectSubCategory align-center flex w-full gap-20">
									<div className="DeleteSelectCategory-field w-2/3">
										<select
											className="DeleteSelectCategory"
											value={subCatName}
											onChange={(e) => setSubCatName(e.target.value)}
										>
											<option selected>
												Select one
											</option>
											{subCatList.map((row) => (
												<option key={row.uniqueIdentifier}>{row.subcatnm}</option>
											))}
										</select>
									</div>

									<button
										type="submit"
										className="py-2 px-4 text-white rounded-md transition duration-200 bg-red-500 hover:bg-red-600"
									>
										Delete SubCategory
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeleteSubSubCategory;
