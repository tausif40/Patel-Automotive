import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './filterOption.css';
import axios from 'axios';
import { categoryUrl, subCategoryUrl } from '../../../../app.url';

function FilterOption() {
	const [ selectedCategories, setSelectedCategories ] = useState([]);
	const [ categoryList, setCategoryList ] = useState([]);
	const [ subCategoryLists, setSubCategoryLists ] = useState({});

	useEffect(() => {
		const savedCategories = localStorage.getItem('selectedCategories');
		if (savedCategories) {
			setSelectedCategories(JSON.parse(savedCategories));
		}

		axios.get(categoryUrl + 'fetch')
			.then((response) => {
				setCategoryList(response.data);
			})
	}, []);

	const handleCategoryClick = (category) => {
		axios.get(subCategoryUrl + 'fetch?catnm=' + category)
			.then((response) => {
				const updatedSubCategoryLists = {
					...subCategoryLists,
					[ category ]: response.data
				};

				setSubCategoryLists(updatedSubCategoryLists);

				setSelectedCategories(prevSelectedCategories => {
					if (prevSelectedCategories.includes(category)) {
						const newCategories = prevSelectedCategories.filter((cat) => cat !== category);
						localStorage.setItem('selectedCategories', JSON.stringify(newCategories));
						return newCategories;
					} else {
						const newCategories = [ ...prevSelectedCategories, category ];
						localStorage.setItem('selectedCategories', JSON.stringify(newCategories));
						return newCategories;
					}
				});
			})
			.catch((error) => { console.log(error) });
	};

	const handleSubCategoryClick = (event, subcategory) => {
		event.stopPropagation();
	};

	return (
		<>
			<div className='filter-section'>
				<div className='filter-heading'>
					<h3>Category</h3>
				</div>
				<div className='filter-option'>
					<ul>
						<Link to='/allProducts'><li className='allProduct'>All Product</li></Link>

						{categoryList.map(category => (
							<li className='list' key={category.catnm} onClick={() => handleCategoryClick(category.catnm)}>
								<Link to={'/allProducts/' + category.catnm}>
									<div className='category'>{category.catnm}</div>
								</Link>

								{
									selectedCategories.includes(category.catnm) && (
										<ul className='subCategory-area'>
											{subCategoryLists[ category.catnm ]?.map(subcategory => (
												<li className='subcategory' key={subcategory.subcatnm} onClick={(event) => handleSubCategoryClick(event, subcategory.subcatnm)}>
													<Link to={'/allProducts/' + subcategory.subcatnm}>
														<div className='subCategoryName'>{subcategory.subcatnm}</div>
													</Link>
												</li>
											))}
										</ul>
									)
								}
							</li>
						))}
					</ul>
				</div>
			</div >
		</>
	);
}

export default FilterOption;