import "./addCategory.css";
import { useState } from "react";
import axios from "axios";
import { categoryUrl } from "../../../app.url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddCategory() {
	const navigate = useNavigate();
	const [ catName, setCatName ] = useState();

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			catnm: catName
		};

		axios
			.post(categoryUrl + "save", data)
			.then((response) => {
				setCatName("");
				toast.success('Category Added Successfully.', {
					autoClose: 600,
				});
			})
			.catch((error) => {
				if (error.response.status === 400) {
					toast.error("Category name already exist");
				} else {
					toast.error("Category not added, try again.");
				}
			}, []);
	};

	return (
		<>
			<div className="container pt-24">
				<div className="">
					<div className="category-section">
						<h3 className="mb-5 underline textColor">Add Category</h3>
						<form className="category-form" onSubmit={handleSubmit}>
							<p HtmlFor="catnm" className="mb-4">
								Category Name
							</p>
							<div className="flex items-center gap-20">
								<div className="category-input w-2/3">
									<input
										type="text"
										className="categoryNameInput"
										value={catName}
										onChange={(e) => setCatName(e.target.value)}
										required
									/>
								</div>

								<button
									type="submit"
									className="adminSubmitBtn py-2 px-4 text-white rounded-md transition duration-200 bg-themeColor hover:bg-themeDark"
								>
									Add Category
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
