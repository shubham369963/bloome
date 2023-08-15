const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "title required"],
    },
    description:{
        type: String,
        required: [true, "description required"],
    },
    image:{
        type: String,
        required: [true, "image required"],
    },
},
{
    timestamps: true,
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;