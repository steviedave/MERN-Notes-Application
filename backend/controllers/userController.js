import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// generate a jwt token
const generateToken = (userId) => {
  return jwt.sign (
    {id: userId},
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
  )
}

// register function
const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body // information that will be in the request

    //check if user exists
    const userExists = await User.findOne({email}) //use email to find user since it is unique
    if (userExists) {
      return res.status(400).json({success: false, message: "User already exists"})
    }

    //check password length
    if (password.length < 8) {
      return res.status(400).json({success: false, message: "Password must be at least 8 characters!"})
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    // create a user
    const user =  await User.create({
      name,
      email,
      password: hashedpassword
    })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    })
  }
}

// login function 
const loginUser = async (req, res) => {
  try {
    const {email, password} = red.body
    // find user by email
    const user = await User.findOne({email})
    if (!user) {
      return res.status(500).json({success: false, message: "Invalid username or password"})
    }

    //comparing passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(500).json({success: false, message: "Invalid username or password"})
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    })
  }
}

//get user profile function
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("password")
    if(!user) {
      return res.status(404).json({message: "User not found"})
    }
    res.json(user)
  } 
  
  catch (error) {
    res.status(500).json({
      message:"Server-error",
      error:error.message
    })
  }
}