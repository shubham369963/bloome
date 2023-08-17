import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard.js";
const Blogs = ({search}) => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data.success) {
        const newarr = [...data.blogs].reverse()
        setBlogs(newarr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.filter((blog) => (
          blog.title.toLowerCase().includes(search.toLowerCase())
        )).map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;