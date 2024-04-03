import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileupload from "express-fileupload";

const app = express();

//import api routers
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.router.js";
import subCategoryRouter from "./routes/subcategory.router.js";
import productRouter from "./routes/product.router.js";
import wishlistRouter from "./routes/wishlist.router.js";

//configuration to accept cross site request
app.use(cors());

//to extract body data from request (POST , PUT , DELETE , PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuration to accept file data
app.use(fileupload());

//route level middleware to load api router
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);

app.listen(3002);
// console.log("server invoked at link http://127.0.0.1:3001");
