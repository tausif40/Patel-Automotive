import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../app.url";
import "./productList.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";

function ProductList(props) {
	const navigate = useNavigate();
	const [ products, setProducts ] = useState([]);
	const [ productsChanged, setProductsChanged ] = useState(false);
	const [ search, setSearch ] = useState('')

	const fetchProducts = () => {
		axios.get(productUrl + 'fetch').then((response) => {
			setProducts(response.data);
		})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteProduct = (id) => {
		const conformation = window.confirm('Are you sure!!');
		let deleteData = { data: { _id: id } };
		if (conformation) {
			axios.delete(productUrl + "delete", deleteData)
				.then((response) => {
					toast.success('Product Deleted Successfully', {
						autoClose: 600,
					});
					setProductsChanged(!productsChanged);
				}).catch((error) => {
					console.log(error);
					toast.error('Product Deletion Failed', {
						autoClose: 600,
					});
				})
		}
	};

	let searchItem = products.filter((item) => {
		if (search === '') {
			return item;
		} else if (item.productName.toLowerCase().includes(search.toLowerCase())) {
			return item;
		} else if (item.modelName.toLowerCase().includes(search.toLowerCase())) {
			return item;
		} else if (item.category.toLowerCase().includes(search.toLowerCase())) {
			return item;
		} else if (item.subCategory.toLowerCase().includes(search.toLowerCase())) {
			return item;
		}
	})

	useEffect(() => {
		fetchProducts();
	}, [ productsChanged, props.productAdd ]);


	return (
		<>
			<div className="mt-24 mb-4 w-full">
				<div className="container product-list">
					<h3 className="text-center underline mb-10">Product List</h3>
					<div className="ProductListSearchBar">
						<input type="search" placeholder="search Products....." onChange={e => setSearch(e.target.value)} />
						<span className="searchIcon"><CiSearch size={25} /></span>
					</div>
					<div className="product-list-section">
						<table className="product-table m-auto">
							<thead>
								<tr>
									<th className="ProductName">Name</th>
									<th className="modelName">Model Name</th>
									<th className="cat">Category</th>
									<th className="">SubCategory</th>
									<th>Price</th>
									<th>Image</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{searchItem.map((product) => (
									<tr>
										<td>{product.productName}</td>
										<td>{product.modelName}</td>
										<td>{product.category}</td>
										<td>{product.subCategory}</td>
										<td>{product.price.toLocaleString("en-IN")}</td>
										<td><img src={`/assets/images/upload/${product.piconnm}`} alt="img" className="size-[70px] object-contain" /></td>
										<td>
											<Link to={`/admin/product/updateProduct/${product._id}`}>
												<button className="text-green-700">Update</button>
											</Link>
										</td>

										<td><button onClick={() => deleteProduct(product._id)} className="text-red-600">Delete</button></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductList;