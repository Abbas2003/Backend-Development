const express = require('express');
const route = express.Router();

route.post("/login", (req, res) => {
    const body = req.body;
    console.log("Body->",body);
    res.send("Login Route");
})
route.post("/signup", () => {})
route.put("/:id", () => {})
route.delete("/:id", () => {})


module.exports = route;