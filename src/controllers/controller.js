import { myuser } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registeruser=async(req,res)=>{
  try{
    const{username,email,password}=req.body;
    const salt =await bcrypt.genSalt(10);
    const haspassword=await bcrypt.hash(password,salt);
    const existingUser = await myuser.findOne({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists',
      });
    }
    
    const response=await myuser.create({
      username:username,
      email:email,
      password:haspassword
    });

    const payload=({
      response:{
        id:response.id
      }
    });

    const token= await jwt.sign(payload,'dfghty',{expiresIn:"1h"});
    res.status(201).json({
     
      message: ' congratulations! User registered successfully'
    });


  }catch(err){
    console.log(err);
    res.status(500).json({
      message: 'invalid Server error',
      error: err.message
    });
  }
};

const loginuser=async(req,res)=>{
  try{
   const {username,email,password}=req.body;
    const check= await myuser.findOne({
      where:{
        email:email
      }
    });
    if(!check){
     return res.status(404).json({
        message:"Not any user with this email",
      })
    }
   const response= await bcrypt.compare(password,check.password);
   if(!response){
   return  res.status(401).json({
      message:"invalid password"
    });
   }
else{
  const payload=({
    check:{
      id:check.id
    }
  });
  const token= await jwt.sign(payload,'fghjk',{expiresIn:"1h"});
 return res.status(201).json({
 
    message:"Login successful"
  })
}


  }catch(err){
    console.log(err);
return res.status(500).json({
  message:"server error"
})
  }
}
export  {registeruser,loginuser};