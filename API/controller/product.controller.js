import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import CategorySchemaModel from '../models/category.model.js';
import ProductSchemaModel from '../models/product.model.js';
import url from 'url';
import moment from 'moment';
import path from 'path';
import rs from './randomstring.controller.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// export var save = async (req, res, next) => {
//   var pDetails = req.body
//   var pList = await ProductSchemaModel.find().sort({ "_id": -1 }).limit(1);
//   var l = pList.length;
//   var _id = l == 0 ? 1 : pList[ 0 ]._id + 1;

//   // Check if req.files.piconnm is an array
//   if (req.files.piconnm && !Array.isArray(req.files.piconnm)) {
//     req.files.piconnm = [ req.files.piconnm ];
//   }

//   if (!req.files.piconnm || !Array.isArray(req.files.piconnm)) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   var filenames = [];

//   for (let fileobj of req.files.piconnm) {
//     var filename = Date.now() + "-" + rs + "-" + fileobj.name;
//     var uploadpath = path.join(__dirname, "../../React-UI/public/assets/images/upload", filename);
//     await fileobj.mv(uploadpath);
//     filenames.push(filename);
//   }

//   pDetails = { ...pDetails, "piconnm": filenames, "_id": _id, "info": Date.now() };
//   var product = await ProductSchemaModel.create(pDetails);
//   if (product)
//     return res.status(201).json({ "result": "Product added successfully...." });
//   else
//     return res.status(500).json({ "result": "Server Error" });
// }

export var save = async (req, res, next) => {
  try {
    var pDetails = req.body
    var pList = await ProductSchemaModel.find().sort({ "_id": -1 }).limit(1);
    var l = pList.length;
    var _id = l == 0 ? 1 : pList[ 0 ]._id + 1;
    var fileobj = req.files.piconnm;
    var filename = Date.now() + "-" + rs + "-" + fileobj.name;
    var uploadpath = path.join(__dirname, "../../React-UI/public/assets/images/upload", filename);
    fileobj.mv(uploadpath);
    pDetails = { ...pDetails, "piconnm": filename, "_id": _id, "date": moment().format('DD-MM-YYYY'), };
    var product = await ProductSchemaModel.create(pDetails);
    if (product)
      return res.status(201).json({ "result": "Product added successfully...." });
    else
      return res.status(500).json({ "result": "Server Error" });
  } catch (error) {
    return res.status(400).json({ "result": "bad request Error" });
  }
}


export var updateProduct = async (request, response, next) => {
  try {
    const condition = request.body.condition_obj;
    const content = request.body.content_obj;

    // if (!isValidJson(conditionObject) || !isValidJson(contentObject)) {
    //   return response.status(400).json({ error: "Invalid JSON format in request body" });
    // }

    // const condition = JSON.parse(conditionObject);
    // const content = JSON.parse(contentObject);

    const productDetails = await ProductSchemaModel.findOne(condition);
    console.log(productDetails);

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