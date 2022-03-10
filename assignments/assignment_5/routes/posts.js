const express = require('express')
const Post = require('../model/post')
const router = express.Router()
const bodyparser = require("body-parser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const SECRET="RESTAPI"

router.use(bodyparser())


router.get('/posts',async(req,res)=> {
    const posts = await Post.find()
    res.json({
        status:"sucess",
        posts
    })
})
router.post('/posts',async(req,res)=> {
    const post = await Post.create({
        title:req.body.title,
        body:req.body.body,
        img:req.body.img,
        user:req.user
    })
    res.json({
        status:"sucess",
        post
    })
})
router.put('/posts/:id',async(req,res)=> {
    const post =await Post.updateOne({_d:req.params.id, user:req.user},{body:req.body.body})
    if (post.modifiedCount>0){
        res.json({

            status:"Post Update",
           
        })
    }else {
        res.json({
            status:"user can not update this post",
           
        })

    }
    
})
router.delete('/posts/:id',async(req,res)=> {
    const post =await Post.deleteOne({_d:req.params.id, user:req.user},
    {body:req.body.body})
    if (post.modifiedCount>0){
        res.json({

            status:"Post Delete",
           
        })
    }else {
        res.json({

            status:"user can not delete this post",
           
        })
    }

}
)
module.exports=router;