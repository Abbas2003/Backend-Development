const express = require('express');
const BookModel = require('../models/bookModel');
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const result = await BookModel.find({});
        res.status(200).json({
            isSuccessful: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccessful: false,
            data: null,
            message: "Something went wrong"
        })
    }
})

route.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await BookModel.findById(id);
        res.status(200).json({
            isSuccessful: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})

route.post("/", async (req, res) => {
    try {
        const body = req.body;
        const obj = {
            title: body.title,
            description: body.description,
            author: body.author,
            noOfPages: Number(body.noOfPages),
        }
        const modelObj = new BookModel(obj);
        modelObj.save().then(
            res.status(201).json({
                isSuccessful: true,
                data: modelObj,
                message: "Book Added Successfully"
            })
        ).catch((err) => { throw err });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})

route.put("/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        const body = req.body;

        const result = await BookModel.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            isSuccessful: true,
            data: result,
            message: "Book Updated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await BookModel.findByIdAndDelete(id);
        res.status(200).json({
            isSuccessful: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessful: false,
            message: error.message
        })
    }
})

route.delete("/", async (req, res) => {
    try {
        const result = await BookModel.deleteMany({}); // Deletes all documents in the collection

        res.status(result.deletedCount > 0 ? 200 : 404).json({
            isSuccessful: result.deletedCount > 0,
            message: result.deletedCount > 0 
                ? "All books deleted successfully" 
                : "No books found to delete",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});



module.exports = route