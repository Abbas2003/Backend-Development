const express = require('express');
const route = express.Router();
let jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required().email()
})

route.post("/login", async (req, res) => {
    const {error, value} = loginSchema.validate(req.body)
    if(error) return res.status(400).send({
        message: error.details[0].message,
        error: true
    })

    const user = await User.findOne({ email: value.email }).lean(); // lean() is used to get plain object instead of mongoose object
    if(!user) return res.status(404).send({
        error: true,
        message: "User is not registered with this email"
    })

    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if(!isPasswordValid) return res.status(401).send({
        error: true,
        message: "Invalid password"
    })

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    return res.status(200).json({
        error: false,
        message: "Login successful",
        message: {token, user}
    })

})


const registerSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

route.post("/signup", async (req, res) => {
    const {error, value} = registerSchema.validate(req.body)
    if(error) return res.status(400).send({
        error: error.details[0].message,
        message: "Invalid input"
    })

    const user = await User.findOne({ email: value.email });
    if(user) return res.status(403).send({
        error: true,
        message: "User already exist with this email"
    })
    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;

    let newUser = new User({ ...value });
    newUser = await newUser.save();

    return res.status(201).json({
        error: false,
        message: "User created successfully",
        data: newUser
    })
})


route.put("/:id", () => {})
route.delete("/:id", () => {})


module.exports = route;