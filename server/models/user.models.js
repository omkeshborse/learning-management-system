import { Schema  ,model} from "mongoose";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    minLength: [5, "Name must be at least 5 characters"],
    maxLength: [70, "Name should be less than 50 characters"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Already registered "],
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,  "Please fill valid email address"
    ],
  },
  password: {
    type: String,
    required : [true ,"Password is required "] ,
    minLength : [8 , "Password must be at least 8 characters"]   ,
    select : false  ,
  }, 
  avatar : {
    public_is :{
        type :String 
    } ,
    secure_url : {
        type : String 
    }
  } ,
  role : {
    type :String , 
    enum : ['USER' , 'ADMIN'] ,
    default :'USER'
  } ,
  forGotPasswordToken : String ,
  forGotPasswordExpiry :Date

} , {
    timestamps : true 
});

userSchema.pre('save' ,async function(){
    if(!this.isModified('password')){
     return next() ;
    }
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods = {
  generateJWTToken  :async function(){
    return (
     await jwt.sign({
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      }),
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    ); 
  }
};

const User = model("User", userSchema); ;
export default User ;
