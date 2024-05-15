//Require Mongoose
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema = new mongoose.Schema({
  _id: Number,
  productName: {
    type: String,
    required: [ true, "Product Name is required" ],
    trim: true,
  },
  price: {
    type: Number,
    required: [ true, "price is required" ],
    trim: true,
  },
  category: {
    type: String,
    required: [ true, "category Name is required" ],
    trim: true,
  },
  subCategory: {
    type: String,
    required: [ true, "subCategory Name is required" ],
    trim: true,
  },
  modelName: {
    type: String,
    trim: true,
  },
  loadingCapacity: {
    type: String,
    trim: true,
  },
  mileageSeatingCapacity: {
    type: String,
    trim: true,
  },
  countryOrigin: {
    type: String,
    trim: true,
  },
  dimension: {
    type: String,
    trim: true,
  },
  chargingTime: {
    type: String,
    trim: true,
  },
  batteryType: {
    type: String,
    trim: true,
  },
  batteryCapacity: {
    type: String, trim: true,

  },
  motorType: {
    type: String,
    trim: true,
  },
  images: {
    type: [ String ],
    required: [ true, "image is required" ],
    trim: true
  },
  date: {
    type: String,
    required: [ true, "Time is required" ],
  }
});

// Apply the uniqueValidator plugin to UserSchema.
ProductSchema.plugin(uniqueValidator);

// compile schema to model
const ProductSchemaModel = mongoose.model('Product_collection', ProductSchema);

export default ProductSchemaModel;