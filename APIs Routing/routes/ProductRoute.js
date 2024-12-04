const express = require('express');
const ProductModel = require('../models/productModel');
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await ProductModel.find({});
        res.status(200).json({
            isSuccessful: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})

route.post('/', async (req, res) => {
    try {
        const requiredKeys = ["name", "description", "price", "category"];
        const body = req.body;
        let arr = []

        requiredKeys.forEach((item) => {
            if(!body[item]){
                arr.push(item);
            }
        })

        if(arr.length > 0){
            return res.status(400).json({
                isSuccessful: false,
                error: "Missing required fields",
                fields: arr
            })
        }

        const obj = {
            name: body.name,
            description: body.description,
            price: body.price,
            category: body.category,
        }

        const modelObj = new ProductModel(obj);
        modelObj.save()
        .then((result) => {
            res.status(201).json({
                isSuccessful: true,
                data: modelObj,
                message: "Product Added Successfully"
            })
        })
        .catch((err) => {
             res.status(400).json({
                isSuccessful: false,
                error: "Failed to save data",
                message: err.message
            })
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})



module.exports = route