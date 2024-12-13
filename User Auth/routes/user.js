const express = require('express');
const route = express.Router();
let jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { authenticateUser } = require('../middleware/authentication');


route.put("/", authenticateUser, async (req, res) => {
    try{
        const {city, gender} = req.body;
        const user = await User.findOneAndUpdate({_id: req.user._id}, { city, gender }, { new: true }).exec();        
        return res.status(200).json({
            error: false,
            message: "User updated successfully",
            data: user
        })

        res.send("Working on update api")

    } catch(err){
        return res.status(200).json({
            error: false,
            message: err.message
        })
    }
})




module.exports = route;