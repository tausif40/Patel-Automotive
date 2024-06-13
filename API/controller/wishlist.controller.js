import wishlistSchemaModel from "../models/wishlist.model.js";
import url from "url";

export const save = async (req, res, next) => {
	try {
		var wishlist = req.body;
		var listCount = await wishlistSchemaModel.find();
		var existingWishlist = await wishlistSchemaModel.findOne({ productId: wishlist.productId });
		if (existingWishlist) {
			return res.status(400).json({ result: "Wishlist already exists" });
		}

		var l = listCount.length;
		var _id = l == 0 ? 1 : listCount[ l - 1 ]._id + 1;

		wishlist = { ...wishlist, _id: _id };

		var cartDetails = await wishlistSchemaModel.create(wishlist);
		if (cartDetails)
			return res.status(201).json({ result: "wishlist added successfully...." });
		else return res.status(500).json({ result: "Server Error" });
	} catch (error) {
		console.error('Error saving wishlist item:', error);
		res.status(500).json({ error: 'Server Error' });
	}
};

export var deleteItem = async (request, response, next) => {
	var condition_object = request.body;
	var user = await wishlistSchemaModel.find(condition_object);
	if (user.length != 0) {
		let result = await wishlistSchemaModel.deleteMany(condition_object);
		if (result) return response.status(201).json({ msg: "success" });
		else return response.status(500).json({ error: "Delete Server Error" });
	} else return response.status(404).json({ error: "Resource not found" });
};

export var fetch = async (req, res, next) => {
	var condition_object = url.parse(req.url, true).query;
	var cList = await wishlistSchemaModel.find(condition_object);
	var l = cList.length;
	if (l != 0) {
		// console.log(cList);
		return res.status(201).json(cList);
	} else return res.status(201).json(cList);
};
