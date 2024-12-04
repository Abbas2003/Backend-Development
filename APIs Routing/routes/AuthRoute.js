const express = require('express');
const route = express.Router();

route.post("/login")
route.post("/signup")
route.put("/:id")
route.delete("/:id")


module.exports = route;