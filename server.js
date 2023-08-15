const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connDB = require("./config/conn.js")
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const userRoutes = require("./routers/userRoute.js");
const blogRoutes = require("./routers/blogRoute.js");
connDB()
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


app.get("/", (req, res)=>{
    res.status(200).send({
        message : "hello",
    });
});

app.listen(port, ()=>{
    console.log(`app running on port ${port}`);
})