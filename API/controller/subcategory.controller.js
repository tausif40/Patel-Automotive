import "../models/connection.js";
import UserSchemaModel from "../models/user.model.js";
import CategorySchemaModel from "../models/category.model.js";
import SubCategorySchemaModel from "../models/subcategory.model.js";
import url from "url";

export var save = async (req, res, next) => {
	try {
		var subCategoryDetails = req.body;
		const existingSubCategory = await SubCategorySchemaModel.findOne({
			subcatnm: subCategoryDetails.subcatnm,
			// catnm: { $ne: subCategoryDetails.catnm }
		});
		if (existingSubCategory) {
			return res.status(400).json({ error: "Subcategory name already exists" });
		}
		var cList = await SubCategorySchemaModel.find().sort({ _id: -1 }).limit(1);
		var l = cList.length;
		var _id = l == 0 ? 1 : cList[ 0 ]._id + 1;
		subCategoryDetails = { ...subCategoryDetails, _id: _id };
		var subCategory = await SubCategorySchemaModel.create(subCategoryDetails);
		if (subCategory)
			return res.status(201).json({ result: "Category added successfully...." });
		else return res.status(500).json({ result: "Server Error" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Server Error" });
	}
};

export var updateSubCategory = async (request, response, next) => {
	try {
		let UpdateData = await SubCategorySchemaModel.findOne(request.body.condition_obj);
		if (UpdateData) {
			let user = await SubCategorySchemaModel.updateOne(request.body.condition_obj, {
				$set: request.body.content_obj
			});
			if (user) return response.status(201).json({ msg: "success" });
			else return response.status(500).json({ error: "Server Error" });
		} else
			return response.status(404).json({ error: "Requested resource not available" });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: "Server Error" });
	}
};

export var deleteSubCategory = async (request, response, next) => {
	try {
		var condition_object = request.body;
		var user = await SubCategorySchemaModel.findOne(condition_object);
		if (user.length != 0) {
			let result = await SubCategorySchemaModel.deleteOne(condition_object);
			if (result) return response.status(201).json({ msg: "success" });
			else return response.status(500).json({ error: "Delete Server Error" });
		} else
			return response.status(404).json({ error: "Resource not found" });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: "Server Error" });
	}
};

export var fetch = async (req, res, next) => {
	try {
		var condition_object = url.parse(req.url, true).query;
		var scList = await SubCategorySchemaModel.find(condition_object);
		var l = scList.length;
		if (l != 0) {
			return res.status(201).json(scList);
		} else return res.status(201).json(scList);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Server Error" });
	}
};
