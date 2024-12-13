const express = require('express');
let jwt = require('jsonwebtoken');
const User = require('../models/user.model');


async function authenticateUser(req, res, next){
    try{
        console.log("authorization: ",req.headers.authorization)
        const bearerToken = req?.headers?.authorization;
        const token = bearerToken.split(" ")[1];
        if(!token){
            return res.status(401).json({
                error: true,
                message: "Token not provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded) {
            const user = await User.findById(decoded._id);
            if(!user){
                return res.status(401).json({
                    error: true,
                    message: "User not found"
                })
            }

            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                error: true,
                message: "Unauthorized"
            })
        }

    } catch(err){
        return res.status(500).send({
            error: true,
            message: err.message
        })
    }
}

module.exports = { authenticateUser };