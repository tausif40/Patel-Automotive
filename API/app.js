import 'dotenv/config';
import dotenv, { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from './db/connection.js';

dotenv.config({
	path: './env'
})
connectDB()
const app = express();
const port = process.env.PORT

//import api routers
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.router.js";
import subCategoryRouter from "./routes/subcategory.router.js";
import productRouter from "./routes/product.router.js";
import wishlistRouter from "./routes/wishlist.router.js";

//configuration to accept cross site request
app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true
}));

//to extract body data from request (POST , PUT , DELETE , PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route level middleware to load api router
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);

app.listen(port || 8080);