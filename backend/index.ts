import express from "express"
import { CreateChatSchema } from "./types"
import { createCompletion } from "./openrouter"
const app=express()

app.use(express.json())

app.post("/chat",(req,res)=>{
    const {success, data} = CreateChatSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({message:"Incorrect inputs"})
        return
    }

    createCompletion()
    
})

app.listen(3000)