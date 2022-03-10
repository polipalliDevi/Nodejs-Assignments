const express=require('express')
const router=express.Router()
const User=require('../model/user')
const bodyparser=require("body-parser")
const { body, validationResult } = require('express-validator');


router.use(bodyparser())



router.get('/',async(req,res)=> {
    const users= await User.find() 
    res.json({
        users
    })
})
// POST route-- createdata

router.post('/',  body('email').isEmail(),async(req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.create(req.body)
        return res.json({
            status:"sucess",
            data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
})

router.get("*",async(req,res)=>{
    res.status(404).json({
        status:"failed",
        message:"not found"
    })
})
// updating
router.put('/:id',async(req,res)=> {
    try {
        const user = await User.updateOne({_id:req.params.id},req.body)
        return res.json({
            status:"sucess",
            //data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
})
// PATCH route -updating
router.patch('/:id',async(req,res)=> {
    try {
        const user = await User.updateOne({_id:req.params.id},req.body)
        return res.json({
            status:"sucess",
            //data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
})

// deleting
router.delete('/:id',async(req,res)=> {
    try {
        const user = await User.deleteOne({_id:req.params.id})
        return res.json({
            status:"sucess",
            //data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = router;