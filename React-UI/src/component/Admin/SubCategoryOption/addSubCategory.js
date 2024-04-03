import "./addSubCategory.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { categoryUrl, subCategoryUrl } from "../../../app.url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSubCategory() {
	const [ catList, setCatList ] = useState([]);
	const [ catName, setCatName ] = useState();
	const [ subCatName, setSubCatName ] = useState();


	useEffect(() => {
		axios
			.get(categoryUrl + "fetch")
			.then((response) => {
				setCatList(response.data);
			}).catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSubCatSubmit = (event) => {
		event.preventDefault();
		const data = {
			catnm: catName,
			subcatnm: subCatName
		};

		if (catName === undefined) {
			toast.error("Please select category.", { autoClose: 600, });
		} else {
			axios.post(subCategoryUrl + "save", data)
				.then((response) => {
					setSubCatName("")
					toast.success("SubCategory Added.", { autoClose: 600, });
				}).catch((error) => {
					if (error.response.status === 400) {
						toast.error("SubCategory already exist.", { autoClose: 600, });
					} else {
						toast.error("SubCategory added fail.", { autoClose: 600, });
						console.log(error);
					}
				});
		};
	}

	return (
		<>
			<div className="container subCategory-section pt-24">
				<div className="">
					<h3 className="underline mb-5 textColor">Add SubCategory</h3>
					<form className="subCategory-form" onSubmit={handleSubCatSubmit}>
						<div className="selectCategory-section w-2/3">
							<label htmlFor="">Select category</label>
							<select
								className="selectCategory"
								value={catName}
								onChange={(e) => setCatName(e.target.value)}
							>
								<option selected disabled>
									Select one
								</option>
								{catList.map((row) => (
									<option>{row.catnm}</option>
								))}
							</select>
						</div>
						<br />
						<p className="mb-2">SubCategory Name</p>
						<div className="categoryInputSection flex items-end gap-20">
							<div className="category-input w-2/3">
								<input
									type="text"
									className="categoryNameInput"
									value={subCatName}
									onChange={(e) => setSubCatName(e.target.value)}
									required
								/>
							</div>

							<button
								type="submit"
								className="adminSubmitBtn py-2 px-4 text-white rounded-md transition duration-200 bg-themeColor hover:bg-themeDark"
							>
								Add SubCategory
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default AddSubCategory;
