import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./productImages.css";



function ProductImages(props) {

	const images = props.images;
	// const images = Array.isArray(props.images) ? props.images : [];
	const renderThumbs = (children) =>
		children.map((item, index) =>
			<img src={item.props.children.props.src} alt={`Thumbnail ${index + 1}`} />
		);

	return (
		<div className="box">
			<Carousel useKeyboardArrows={true}>
				{images.map((URL, index) => (
					<div className="slide flex">
						<img className="slider-image" alt="img" src={URL} key={index} style={{ backgroundColor: 'gray' }} />
					</div>
				))}
			</Carousel>
		</div>
	);
}
export default ProductImages;