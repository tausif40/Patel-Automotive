import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./deleteCategory.css";
import { categoryUrl } from "../../../app.url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddCategory() {
	const [ catName, setCatName ] = useState();
	const [ catList, setCatList ] = useState([]);

	const navigate = useNavigate();

	const deleteCategory = (event) => {
		event.preventDefault();
		const selectedCategory = catList.find(category => category.catnm === catName);
		if (!selectedCategory) {
			toast.error("Please select a category.", { autoClose: 600, });
			return;
		}
		const deleteCategory = { data: { catnm: catName } };
		axios.delete(categoryUrl + "delete", deleteCategory)
			.then((response) => {
				toast.success("Category Deleted Successfully.", { autoClose: 600, });
			}).catch((error) => {
				console.log(error);
				toast.error("Category not Deleted", { autoClose: 600, });
			});
	};

	useEffect(() => {
		axios
			.get(categoryUrl + "fetch")
			.then((response) => {
				setCatList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [ deleteCategory ]);

	return (
		<>
			<div className="container pt-20">
				<div className="">
					<div className="category-section">
						<h3 className="mb-5 underline textColor">Delete Category</h3>
						<form className="DeleteCategory-form">
							<p> Select Category</p>
							<div className="DeleteCategory-section flex items-center gap-20">
								<div className="DeleteCategory w-2/3">
									<select
										className="selectCategory"
										value={catName}
										onChange={(e) => setCatName(e.target.value)}
									>
										<option selected>
											Select one
										</option>
										{catList.map((row) => (
											<option>{row.catnm}</option>
										))}
									</select>
								</div>

								<button
									onClick={deleteCategory}
									className="adminSubmitBtn py-2 px-4 text-white rounded-md transition duration-200 bg-red-500 hover:bg-red-600"
								>
									Delete Category
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddCategory;
