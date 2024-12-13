require('dotenv').config();
const AuthRoute = require('./routes/auth.js'); 
const UserRoute = require('./routes/user.js'); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Root API
app.get('/', (req, res) => {
    res.send("Hello World API");
})

app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);



mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`DB Connected & Server is running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})
