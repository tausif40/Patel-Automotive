import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./updateCategory.css";
import { categoryUrl } from "../../../app.url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UpdateCategory() {
	const [ catName, setCatName ] = useState();
	const [ newCatName, setNewCatName ] = useState();
	const [ catList, setCatList ] = useState([]);

	const navigate = useNavigate();

	const UpdateCategory = (event) => {
		event.preventDefault();
		const selectedCategory = catList.find(category => category.catnm === catName);
		if (!selectedCategory) {
			toast.error("Please select a category.");
			return;
		}
		const updateCategoryName = {
			condition_obj: { _id: selectedCategory._id },
			content_obj: { catnm: newCatName }
		};
		axios.patch(categoryUrl + "update", updateCategoryName)
			.then((response) => {
				setNewCatName('');
				toast.success("Category Updated Successfully.", {
					autoClose: 600,
				});
			}).catch((error) => {
				console.log(error);
				toast.error("Category not updated!", {
					autoClose: 600,
				});
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
	}, [ UpdateCategory ]);

	return (
		<>
			<div className="container py-20">
				<div className="">
					<div className="category-section">
						<h3 className="mb-5 underline textColor">Update Category</h3>
						<form className="UpdateCategory-form" onSubmit={UpdateCategory}>
							<div className="UpdateCategory">
								<div className="selectCategory-section w-2/3">
									<label HtmlFor="catnm" className="">
										Select Category
									</label>
									<select
										className="selectCategory"
										value={catName}
										onChange={(e) => setCatName(e.target.value)}
									>
										<option selected>Select one</option>
										{catList.map((row) => (
											<option>{row.catnm}</option>
										))}
									</select>
								</div>

								<p className="mt-6">New category Name</p>
								<div className="updateCategory-input flex items-end gap-20 mt-2">
									<div className="category-input w-2/3">
										<input
											type="text"
											className="updateCategoryNameInput"
											value={newCatName}
											onChange={(e) => setNewCatName(e.target.value)}
											required
										/>
									</div>

									<button
										type="submit"
										className="adminSubmitBtn py-2 px-4 text-white rounded-md transition duration-200 bg-themeColor hover:bg-themeDark"
									>
										Update Category
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

export default UpdateCategory;
