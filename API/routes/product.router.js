import express from 'express';
const router = express.Router();
import upload from '../middleware/multer.js';

import * as productController from '../controller/product.controller.js';

router.post("/save", upload.array('images', 10), productController.save);

router.get("/fetch", productController.fetch);

router.post("/fetchWishlist", productController.fetchWishlist);

router.delete("/delete", productController.deleteProduct);

router.patch("/update", productController.updateProduct);


export default router;