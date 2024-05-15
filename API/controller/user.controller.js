// import "../models/connection.js";
import UserSchemaModel from "../models/user.model.js";
import moment from 'moment';
import jwt from "jsonwebtoken";
import rs from "randomstring";
import url from "url";


export var save = async (req, res, next) => {
  try {
    var userDetails = req.body;
    var userList = await UserSchemaModel.find();

    var existingUser = await UserSchemaModel.findOne({ phone: userDetails.phone });
    if (existingUser) {
      // If user already exists, return a status and message
      return res.status(409).json({ message: "Number already exists" });
    }

    var l = userList.length;
    var _id = l == 0 ? 1 : userList[ l - 1 ]._id + 1;

    let payload = { subject: userDetails.phone };
    let key = rs.generate();
    let token = jwt.sign(payload, key);

    userDetails = {
      ...userDetails,
      _id: _id,
      status: 0,
      role: "user",
      date: moment().format('DD-MM-YYYY'),
      time: moment().format('HH:mm:ss'),
      user_token: token,
    };
    var user = await UserSchemaModel.create(userDetails);
    if (user) {
      return res.status(201).json({ "result": "User register successfully...." });
    }
    else
      return res.status(500).json({ "result": "Server Error" });
  } catch (error) {
    return res.status(500).json({ "result": "Server Error" });
  }
}

export var login = async (req, res, next) => {
  var userDetails = req.body;
  userDetails = { ...userDetails, status: 1 };
  var userList = await UserSchemaModel.find(userDetails);
  var l = userList.length;
  if (l != 0) {
    let payload = { subject: userList[ 0 ].phone };
    let key = rs.generate();
    let token = jwt.sign(payload, key);
    return res.status(201).json({ token: token, userDetails: userList[ 0 ] });
  } else return res.status(500).json({ token: "error" });
};

export var fetch = async (req, res, next) => {
  var condition_object = url.parse(req.url, true).query;
  var userList = await UserSchemaModel.find(condition_object);
  var l = userList.length;
  if (l != 0) return res.status(201).json(userList);
  else return res.status(500).json({ result: "Server Error" });
};

export var deleteUser = async (request, response, next) => {
  var condition_object = request.body;
  var user = await UserSchemaModel.find(condition_object);
  if (user.length != 0) {
    let result = await UserSchemaModel.deleteMany(condition_object);
    if (result) return response.status(201).json({ msg: "success" });
    else return response.status(500).json({ error: "Delete Server Error" });
  } else return response.status(404).json({ error: "Resource not found" });
};
export const getUserById = async (req, res) => {
  const condition_object = req.params.id;

  var userList = await userSchemaModel.findById(condition_object);

  res.status(200).send({ data: userList });
};

export var updateUser = async (request, response, next) => {
  let userDetails = await UserSchemaModel.findOne(request.body.condition_obj);
  if (userDetails) {
    let user = await UserSchemaModel.updateOne(request.body.condition_obj, {
      $set: request.body.content_obj
    });
    if (user) return response.status(201).json({ msg: "success" });
    else return response.status(500).json({ error: "Server Error" });
  } else
    return response
      .status(404)
      .json({ error: "Requested resource not available" });
};
