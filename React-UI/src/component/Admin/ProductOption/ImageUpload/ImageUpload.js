import React, { useState } from "react";
import "./imageUpload.css";
import { RxCross2 } from "react-icons/rx";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { HiMiniChevronRight } from "react-icons/hi2";

const ImageUploader = () => {
	const [ images, setImages ] = useState([]);
	const [ previewImages, setPreviewImages ] = useState([]);

	const handleImageChange = (e) => {
		const selectedImages = Array.from(e.target.files);
		handleImages(selectedImages);
	};


	const handleImages = (imageFiles) => {
		const selectedImages = imageFiles.filter((file) =>
			file.type.startsWith("image/")
		);

		const newImages = selectedImages.map((image, index) => ({
			file: image,
			serialNumber: images.length + index + 1
		}));

		setImages((prevImages) => [ ...prevImages, ...newImages ]);

		const selectedPreviewImages = newImages.map((image) =>
			URL.createObjectURL(image.file)
		);

		setPreviewImages((prevPreviewImages) => [
			...prevPreviewImages,
			...selectedPreviewImages
		]);
	};

	const handleRemoveImage = (event, index) => {
		event.preventDefault();
		const updatedImages = [ ...images ];
		updatedImages.splice(index, 1);

		const updatedPreviewImages = [ ...previewImages ];
		updatedPreviewImages.splice(index, 1);

		setImages(
			updatedImages.map((image, i) => ({ ...image, serialNumber: i + 1 }))
		);
		setPreviewImages(updatedPreviewImages);
	};

	const handleMoveUp = (event, index) => {
		event.preventDefault();
		if (index > 0) {
			const updatedImages = [ ...images ];
			[ updatedImages[ index - 1 ], updatedImages[ index ] ] = [
				updatedImages[ index ],
				updatedImages[ index - 1 ]
			];

			setImages(
				updatedImages.map((image, i) => ({ ...image, serialNumber: i + 1 }))
			);
			setPreviewImages((prevPreviewImages) => {
				const updatedPreviewImages = [ ...prevPreviewImages ];
				[ updatedPreviewImages[ index - 1 ], updatedPreviewImages[ index ] ] = [
					updatedPreviewImages[ index ],
					updatedPreviewImages[ index - 1 ]
				];
				return updatedPreviewImages;
			});
		}
	};

	const handleMoveDown = (event, index) => {
		event.preventDefault();
		if (index < images.length - 1) {
			const updatedImages = [ ...images ];
			[ updatedImages[ index ], updatedImages[ index + 1 ] ] = [
				updatedImages[ index + 1 ],
				updatedImages[ index ]
			];

			setImages(
				updatedImages.map((image, i) => ({ ...image, serialNumber: i + 1 }))
			);
			setPreviewImages((prevPreviewImages) => {
				const updatedPreviewImages = [ ...prevPreviewImages ];
				[ updatedPreviewImages[ index ], updatedPreviewImages[ index + 1 ] ] = [
					updatedPreviewImages[ index + 1 ],
					updatedPreviewImages[ index ]
				];
				return updatedPreviewImages;
			});
		}
	};

	const handleClearAll = () => {
		setImages([]);
		setPreviewImages([]);
	};


	return (
		<div className="ImageUploader">
			<label htmlFor="imageInput" className="Label"> Choose Images</label>
			<input type="file" accept="image/*" multiple id="imageInput" onChange={handleImageChange} className="Input" />

			<div className="ImagesContainer">

				<div className="flex">
					{images.map((image, index) => (
						<div key={image.serialNumber} className="ImageWrapper">
							<img src={previewImages[ index ]} alt={`Preview ${image.serialNumber}`} className="Image" />
							<div className="ButtonsContainer">
								<button onClick={(event) => handleRemoveImage(event, index)} className="Button RemoveButton"> <RxCross2 /> </button>
								<div>
									<button onClick={(event) => handleMoveUp(event, index)} className="Button MoveUpButton" > <HiMiniChevronLeft /> </button>
									<button onClick={(event) => handleMoveDown(event, index)} className="Button MoveDownButton" ><HiMiniChevronRight /> </button>
								</div>
							</div>
						</div>
					))}
				</div>
				{images.length > 0 && (
					<button onClick={handleClearAll} className="ClearAll-btn" >Clear All</button>
				)}
			</div>
		</div>
	);
};

export default ImageUploader;