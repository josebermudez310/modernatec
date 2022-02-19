//importaciones necesarias
import { Router, Request, Response } from "express";

export const router= Router();

router.get('/face',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        mensaje:'todo está bien'
    })
})