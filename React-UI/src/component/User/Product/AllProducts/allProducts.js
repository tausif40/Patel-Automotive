import React from 'react';
import FilterOption from '../Filter/filterOption';
import './allProducts.css';
import ProductDetails from '../ProductDetails/productDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { productUrl } from '../../../../app.url';

function AllProducts() {

	const [ filterOption, setFilterOption ] = useState('');
	const [ isMobile, setIsMobile ] = useState(window.matchMedia('(max-width: 768px)').matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		const handler = (e) => setIsMobile(e.matches);

		mediaQuery.addEventListener('change', handler);

		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	useEffect(() => {
		if (isMobile) {
			setFilterOption('hidden');
		} else {
			setFilterOption('');
		}
	}, [ isMobile ]);

	const showFilterOption = () => {
		filterOption === 'hidden' ? setFilterOption('') : setFilterOption('hidden');
	};

	return (
		<>
			<section className='allProduct-container pt-16 pr-10 flex gap-[5%] mt-0'>
				<div className='mobile-filter hidden' onClick={showFilterOption}>
					Select Category
				</div>
				{/* filter section*/}
				<div className={`filter-option ${filterOption}`}>
					<div className={`filter-background ${filterOption}`} onClick={showFilterOption}></div>
					<FilterOption />
				</div>
				<div className='allProduct-section'>
					<ProductDetails />
				</div>
			</section>
		</>
	)
}

export default AllProducts;