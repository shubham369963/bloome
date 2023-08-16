const express = require("express");
const router = express.Router();
const {
    getAllBlogsController, 
    createBlogController, 
    updateBlogController, 
    deleteBlogController, 
    getBlogByIdController,
    userBlogController,
} = require("../controllers/blogController.js");

router.route("/all-blog").get(getAllBlogsController);
router.route("/create-blog").post(createBlogController);
router.route("/update-blog/:id").put(updateBlogController);
router.route("/delete-blog/:id").delete(deleteBlogController);
router.route("/get-blog/:id").get(getBlogByIdController);
router.route("/user-blog/:id").get(userBlogController);
module.exports = router;