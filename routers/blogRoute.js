const express = require("express");
const router = express.Router();
const {
    getAllBlogsController, 
    createBlogController, 
    updateBlogController, 
    deleteBlogController, 
    getBlogByIdController,
} = require("../controllers/blogController.js");

router.route("/all-blogs").get(getAllBlogsController);
router.route("/create-blog").post(createBlogController);
router.route("/update-blog/:id").put(updateBlogController);
router.route("/delete-blog/:id").delete(deleteBlogController);
router.route("/get-blog/:id").get(getBlogByIdController);
module.exports = router;