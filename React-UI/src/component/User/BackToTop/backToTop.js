import React, { useState, useEffect } from 'react';
import './backToTop.css';
import { IoArrowUpSharp } from "react-icons/io5";

const BackToTopButton = () => {
	const [ isVisible, setIsVisible ] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
			onClick={scrollToTop}
		>
			<IoArrowUpSharp size={25} />
		</button>
	);
};

export default BackToTopButton;
