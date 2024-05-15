// import "../models/connection.js";
import UserSchemaModel from "../models/user.model.js";
import CategorySchemaModel from "../models/category.model.js";
import url from "url";

export var save = async (req, res, next) => {
	try {
		var categoryDetails = req.body;
		var existingCategory = await CategorySchemaModel.findOne({ catnm: categoryDetails.catnm });
		if (existingCategory) {
			return res.status(400).json({ result: "Category with the same name already exists." });
		}
		var cList = await CategorySchemaModel.find().sort({ _id: -1 }).limit(1);
		var l = cList.length;
		var _id = l == 0 ? 1 : cList[ 0 ]._id + 1;
		categoryDetails = { ...categoryDetails, _id: _id };
		var category = await CategorySchemaModel.create(categoryDetails);
		if (category)
			return res.status(201).json({ result: "Category added successfully...." });
		else return res.status(500).json({ result: "Server Error" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ "result": error });
	}
};

export var updateCategory = async (request, response, next) => {
	try {
		let categoryName = await CategorySchemaModel.findOne(request.body.condition_obj);
		if (categoryName) {
			let category = await CategorySchemaModel.updateOne(request.body.condition_obj, {
				$set: request.body.content_obj
			});
			if (category) return response.status(201).json({ msg: "success" });
			else return response.status(500).json({ error: "Server Error" });
		} else
			return response.status(404).json({ error: "Requested resource not available" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ "result": error });
	}
};

export var deleteCategory = async (request, response, next) => {
	try {
		var condition_object = request.body;
		var user = await CategorySchemaModel.find(condition_object);
		if (user.length != 0) {
			let result = await CategorySchemaModel.deleteMany(condition_object);
			if (result) return response.status(201).json({ msg: "success" });
			else return response.status(500).json({ error: "Delete Server Error" });
		} else return response.status(404).json({ error: "Resource not found" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ "result": error });
	}
};

export var fetch = async (req, res, next) => {
	try {
		var condition_object = url.parse(req.url, true).query;
		var cList = await CategorySchemaModel.find(condition_object);
		var l = cList.length;
		if (l != 0) {
			return res.status(201).json(cList);
		} else return res.status(201).json(cList);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ "result": error });
	}
};
