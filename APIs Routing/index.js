require('dotenv').config();
const BookRoute = require('./routes/BookRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Root API
app.get('/', (req, res) => {
    res.send("Hello World API");
})

app.use(express.json());
app.use("/book", BookRoute);
app.use("/product", ProductRoute);
app.use("/user", AuthRoute);



mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(5000, () => {
        console.log('DB Connected & Server is running on port 5000');
    })
}).catch((err) => {
    console.log(err);
})
