import ProductSchemaModel from '../models/product.model.js';
import url from 'url';
import moment from 'moment';
import cloudinary from '../utils/cloudinary.js'


export var save = async (req, res) => {
  try {
    // console.log(req);
    var pDetails = req.body;
    // console.log(req.body.productName);
    var pList = await ProductSchemaModel.find().sort({ "_id": -1 }).limit(1);
    var l = pList.length;
    var _id = l == 0 ? 1 : pList[ 0 ]._id + 1;

    const patelAutomotiveFolder = `PatelAutomotive/${req.body.productName}`
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: patelAutomotiveFolder });
      images.push(result.secure_url);
    }

    pDetails = { ...pDetails, "images": images, "_id": _id, "date": moment().format('DD-MM-YYYY'), };
    var product = await ProductSchemaModel.create(pDetails);
    if (product)
      return res.status(201).json({ "result": "Product added successfully...." });
    else
      return res.status(500).json({ "result": "Server Error" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ "result": "bad request Error" });
  }
}


export var updateProduct = async (request, response, next) => {
  try {
    const condition = request.body.condition_obj;
    const content = request.body.content_obj;

    const productDetails = await ProductSchemaModel.findOne(condition);
    // console.log(productDetails);

    if (!productDetails) {
      return response.status(404).json({ error: "Requested resource not available" });
    }

    const updatedProduct = await ProductSchemaModel.updateOne(condition, { $set: content });

    if (updatedProduct) {
      return response.status(200).json({ msg: "Product updated successfully" });
    } else {
      return response.status(500).json({ error: "Failed to update product" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}



export var deleteProduct = async (request, response, next) => {
  var condition_object = request.body;
  // console.log(condition_object);
  var cDetails = await ProductSchemaModel.find(condition_object);
  // console.log(cDetails)
  if (cDetails.length != 0) {
    let result = await ProductSchemaModel.deleteMany(condition_object);

    if (result)
      return response.status(201).json({ "msg": "success" });
    else
      return response.status(500).json({ error: "Server Error" });
  }
  else
    return response.status(404).json({ error: "Resource not found" });
}

export var fetch = async (req, res, next) => {
  var condition_object = url.parse(req.url, true).query;
  var pList = await ProductSchemaModel.find(condition_object);
  var l = pList.length;
  if (l != 0) {
    return res.status(201).json(pList);
  }
  else
    return res.status(201).json(pList);
}

export var fetchWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const wishlist = await ProductSchemaModel.find({ _id: { $in: productId } });
    if (wishlist.length > 0) {
      return res.status(200).json({ wishlist });
    } else {
      return res.status(404).json({ error: "No products found in the wishlist" });
    }

  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}