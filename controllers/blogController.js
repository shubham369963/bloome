const Blog = require('../model/blogModel.js');
const asyncHandler = require('express-async-handler');


const getAllBlogsController = asyncHandler(async (req, res) => {
    try{
        const blogs = await Blog.find({});

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
        const {title , description, image} = req.body;

        if(!title || !description || !image){
            return res.status(400).send({
                success: false,
                message: "Please Fill Details"
            })
        }

        const newBlog = await Blog.create({title, description, image});

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
        const blog = await Blog.findById(id);

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

module.exports = { 
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    deleteBlogController,
    getBlogByIdController,
};
