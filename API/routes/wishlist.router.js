import express from "express";
const router = express.Router();

import * as wishlistController from '../controller/wishlist.controller.js'

router.post("/save", wishlistController.save);

router.get("/fetch", wishlistController.fetch);

router.delete("/delete", wishlistController.deleteItem);

export default router;
