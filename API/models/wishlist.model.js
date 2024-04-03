import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const wishlistSchema = mongoose.Schema({
	_id: Number,
	productId: {
		type: Number,
		required: [ true, "productId is required" ],
		unique: true,
		trim: true,
	},
	user_token: {
		type: String,
		required: [ true, "user_token is required" ],
		trim: true,
	},
});

// Apply the uniqueValidator plugin to UserSchema.
wishlistSchema.plugin(uniqueValidator);

// compile schema to model
const wishlistSchemaModel = mongoose.model(
	"save_item",
	wishlistSchema
);

export default wishlistSchemaModel;