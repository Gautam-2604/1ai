import { Router } from "express";
import { CreateUser, Signin } from "../types";
import { sendEmail } from "../postmark";
// import { success } from "zod";
import jwt from "jsonwebtoken"
import {TOTP} from "totp-generator"
import base32 from "hi-base32"

const router = Router()

router.post("/initiate_signin", async(req,res)=>{
    try {
        const {success, data} = CreateUser.safeParse(req.body)
        if(!success){
            res.status(401).json({"message":"Wrong info provided"})
            return;
        }
        const { otp } = await TOTP.generate(base32.encode(data.email+process.env.JWT_SECRET))
        await sendEmail(data.email, "Login to 1ai", `Your otp is ${otp}`)
        res.json({
            message:"Bro, login doe ho gya",
            success: true

        })
    
    } catch (error) {
        console.log(error);
        res.json({
            message:"Bro, some mistake happened",
            success: false

        })
        
    }
})

router.post("/signin", async(req,res)=>{
    const {success, data} = Signin.safeParse(req.body)
    if(!success){
        res.status(401).json({"message":"Wrong info provided"})
        return;
    }
    

    const { otp } = await TOTP.generate(base32.encode(data.email+process.env.JWT_SECRET))
    if(otp!=data.otp){
        res.send({
            message:"OTP does not match",
            status:411
        })
        return;
    }
    const verified= true;
    const username="gautam"

    const token=jwt.sign(username, process.env.JWT_SECRET!, {expiresIn:'1d'})
    res.json({token, success: true})

})

export default router

