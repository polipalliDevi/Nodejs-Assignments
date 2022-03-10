const express = require('express')
const User = require('../model/user')
const router = express.Router()
const bodyparser = require("body-parser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const SECRET="RESTAPI"

router.use(bodyparser())


router.post('/register',body("name") ,body("email"), body("password"), async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body
        console.log(name,email,password)
        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(400).json({
                    status: "failded",
                    message: "Invalid details"
                })
            const user = await User.create({
                name,
                email,
                password: hash
            })
            
            res.json({
                status: "sucess",
                data: user
            })
            }
        });

    } catch (error) {
        res.json({
            status: "failed",
            message: error.message
        })
    }

})
//login
router.post('/login', body("email"), body("password"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        const user=await User.findOne({email})
        if (!user){
            res.status(401).json({
                status:"failed",
                message:"Invalid user"
            })
        }

        // Load hash from your password DB.
        bcrypt.compare(password, user.password).then(function (result) {
            if (result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                res.json({
                    status:"sucess",
                    token 
                })
            }else {
                res.status(401).json({
                    status:"sucess",
                    message:"not authenticated"
                })
            }
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message
        })
    }

})

module.exports = router;
