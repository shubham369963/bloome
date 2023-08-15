const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "username required"],
    },
    email:{
        type: String,
        required: [true, "email required"],
    },
    password:{
        type: String,
        required: [true, "password required"],
    },
},
{
    timestamps: true,
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;