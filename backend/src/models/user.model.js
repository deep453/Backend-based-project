import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema(
    {
      username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
      },
      email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
      },
      fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
      },
      avatar:{
        type:String,
        required:true,
      },
      coverImage:{
        type:String,
      },
      watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
      ],
      password:{
        type:String,
        required:[true,'Password is required']
      },
      refreshToken:{
        type:String
      }
 },
 {
    timestamps:true
 }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect=async function (password) {
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
)
}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
)
}

export const User= mongoose.model("User",userSchema)

// const loginUser=asyncHandler(async(req,res)=>{
//    //req body->data
//    //username or email
//    //find the user
//    //password check
//    //access and refresh token
//    //send cookie
//    const {username,email,password}=req.body

//    if(!username || !email){
//     throw new ApiError(400,"Username or email is required")
//   }
//      const user=await User.findOne({$or:[{username},{email}]})
//      if(!user){
//         throw new ApiError(404,"User not found")
//      }
//      const isPasswordValid=await user.isPasswordCorrect(password)
//      if(!isPasswordValid){
//         throw new ApiError(401,"Invalid user credentials")
//      }
//      const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
//      const loggedInUser={await User.findById(user._id).select("-password -refreshToken")}
//         const options={
//           httpOnly:true,
//           secure:true,
//         }
//         return res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
          
      
// new ApiResponse(
//   200,
//   {
//     user:loggedInUser,
//     accessToken,
//     refreshToken
//   },
//   "User logged in successfully"
// )  
// )
//    })
//   export{
//     registerUser,
//     loginUser,
//     logoutUser
//   }
