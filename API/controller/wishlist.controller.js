import "../models/connection.js";
import wishlistSchemaModel from "../models/wishlist.model.js";
import url from "url";

export var save = async (req, res, next) => {
	var wishlist = req.body;
	var existingWishlist = await wishlistSchemaModel.findOne(wishlist);
	if (existingWishlist) {
		return res.status(400).json({ result: "Wishlist already exists" });
	}
	var wishlistList = await wishlistSchemaModel.find().sort({ _id: -1 }).limit(1);
	var l = wishlistList.length;
	var _id = l == 0 ? 1 : wishlistList[ 0 ]._id + 1;

	wishlist = { ...wishlist, _id: _id };
	var cartDetails = await wishlistSchemaModel.create(wishlist);
	if (cartDetails)
		return res.status(201).json({ result: "wishlist added successfully...." });
	else return res.status(500).json({ result: "Server Error" });
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
