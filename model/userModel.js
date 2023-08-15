const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

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
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;