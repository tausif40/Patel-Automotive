//Require Mongoose
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const SubCategorySchema = mongoose.Schema({
	_id: Number,
	catnm: {
		type: String,
		required: [ true, "Category name is required" ],
		trim: true
	},
	subcatnm: {
		type: String,
		required: [ true, "SubCategory name is required" ],
		unique: true,
		trim: true
	}
});

// Apply the uniqueValidator plugin to UserSchema.
SubCategorySchema.plugin(uniqueValidator);

// compile schema to model
const SubCategorySchemaModel = mongoose.model(
	"subcategory_collection",
	SubCategorySchema
);

export default SubCategorySchemaModel;