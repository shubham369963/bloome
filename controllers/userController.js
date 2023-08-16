const User = require('../model/userModel.js');
const asyncHandler = require('express-async-handler');


const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send({
      userCount: users.length,
      message: 'All Users Data',
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error In Get All Users',
      success: false,
      error,
    });
  }
});

const registerController = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        message: 'Please Fill All Details',
        success: false,
      });
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
      // res.status(401);
      // throw new Error('User Already Exists');
      return res.status(401).send({
        message: 'User Already Exists',
        success: false,
      });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      return res.status(200).send({
        success: true,
        message: 'New User Successfully Created',
        user,
      });
    } else {
      // res.status(400);
      // throw new Error('Error Occured');
      return res.status(400).send({
        message: 'Error Occured',
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error In Register',
      success: false,
      error,
    });
  }
});

const loginController = asyncHandler(async (req, res) => {
  try {
    const {email , password} = req.body;

    if (!email || !password) {
      return res.status(401).send({
        message: 'Please Fill All Details',
        success: false,
      });
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(200).send({
        message: 'User Not Registered',
        success: false,
      });
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
      return res.status(401).send({
        message: 'Invalid Credentials',
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error In Login',
      success: false,
      error,
    });
  }
});

module.exports = { getAllUsers, registerController, loginController };
