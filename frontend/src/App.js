import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import UserBlogs from "./pages/UserBlogs.js";
import CreateBlog from "./pages/CreateBlog.js";
import BlogDetails from "./pages/BlogDetails.js";
import { Toaster } from "react-hot-toast";
import {useState} from "react"
function App() {

  const [search, setSearch] = useState("")
  return (
    <>
      <Header setSearch={setSearch}/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs search={search}/>} />
        <Route path="/blogs" element={<Blogs search={search}/>} />
        <Route path="/my-blogs" element={<UserBlogs search={search}/>} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
