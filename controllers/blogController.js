const Blog = require('../model/blogModel.js');
const User = require('../model/userModel.js');
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose")

const getAllBlogsController = asyncHandler(async (req, res) => {
    try{
        const blogs = await Blog.find({}).populate("user");

        if(!blogs){
            return res.status(200).send({
                success: false,
                message: "No Blogs Found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "All Blogs Lists",
            blogCounts: blogs.length,
            blogs,
        })
    }catch(error){
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Getting All Blogs",
        error,
      })
    }
});

const createBlogController = asyncHandler(async (req, res) => {
    try{
        const {title , description, image, user} = req.body;

        if(!title || !description || !image || !user){
            return res.status(400).send({
                success: false,
                message: "Please Fill Details"
            })
        }
        const existingUser = await User.findById(user);

        if(!existingUser){
          return res.status(404).send({
            success: false,
            message: "unable to find user"
          })
        }

        const session = await mongoose.startSession();
        session.startTransaction();


        const newBlog = await Blog.create({title, description, image, user});
        await newBlog.save({session});
        existingUser.blogs.push(newBlog)
        await existingUser.save({session});


        await session.commitTransaction();


        if (newBlog) {
            return res.status(500).send({
              message: 'New Blog Successfully Created',
              success: true,
              newBlog,
            });
          } else {
            return res.status(400).send({
              message: 'Error Occured',
              success: false,
            });
          }
    }catch(error){
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Creating Blog",
        error,
      })
    }
});

const updateBlogController = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;
        const {title, description, image} = req.body;

        const blog = await Blog.findById(id);

        if(blog){

            blog.title = title;
            blog.description = description;
            blog.image = image;

            const updatedBlog = await blog.save();
            return res.status(200).send({
                success: true,
                message: "Blog Updated Successfully",
                updatedBlog
            })
            
        }else{
            return res.status(404).send({
                success: false,
                message: "No Blogs Found"
            })
        }

    }catch(error){
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Updating Blog",
        error,
      })
    }
});

const deleteBlogController = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if(blog){
            const deletedBlog = await blog.deleteOne();
            return res.status(200).send({
                success: true,
                message: "Blog Deleted Successfully",
                deletedBlog
            })
            
        }else{
            return res.status(404).send({
                success: false,
                message: "No Blogs Found"
            })
        }
    }catch(error){
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Deleting Blog",
        error,
      })
    }
});

const getBlogByIdController = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(404).send({
                success: false,
                message: "No Blogs Found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Fetch Single Blog",
            blog
        })

    }catch(error){
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Getting Blog By Id",
        error,
      })
    }
});


const userBlogController = asyncHandler(async (req, res)=>{
  try{
    const userBlogs = await User.findById(req.params.id).populate("blogs");
    if(!userBlogs){
      return res.status(404).send({
        success: false,
        message: "No Blogs Found"
      })
    }

    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlogs
    })
  }catch(error){
    console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error User Blog",
        error,
      })
  }
})
module.exports = { 
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    deleteBlogController,
    getBlogByIdController,
    userBlogController,
};
