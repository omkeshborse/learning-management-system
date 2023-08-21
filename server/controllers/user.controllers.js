import  User  from "../models/user.models.js";
import  AppError  from "../utils/error.util.js";
const cookieOption ={
  maxAge : 7*24 *60 *60 *1000 ,
  httpOnly  : true , 
  secure : true 
}

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const UserExists = await User.findOne({ email });
  /* note omkesh ! sign is not use in this this is because UserExists give true if user Already register */
  if (UserExists) {
    return next(new AppError("User Already Exits", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });
  if (!user) {
     return next(new AppError("User registration failed , Please try again", 400));

  }

  /* to do  :File upload  */
  await user.save() ;
  user.password = undefined ;

  const token =await user.generateJWTToken() ;
  res.cookies('token' , token , cookieOption) ;
  res.status(201).json({
    success : true , 
    message : "User register Successfully" ,
    user 
  })
};

const login = (req, res) => {};

const logout = (req, res) => {};

const getProfile = (req, res) => {};

export { register, login, logout, getProfile };
