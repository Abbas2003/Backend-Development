require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BookModel = require('./models/bookModel');
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(5000, () => {
        console.log('DB Connected & Server is running on port 5000');
    })
}).catch((err) => {
    console.log(err);
})

// Root API
app.get('/', (req, res) => {
    res.send("Hello World API");
})

// Get all books API
app.get("/book", async (req, res) => {
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

// Get single book API
app.get("/book/:id", async (req, res) => {
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

// Delete single book API
app.delete("/book/:id", async (req, res) => {
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

// Delete all books API
app.delete("/book", async (req, res) => {
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

// Add Book API
app.post("/book", async (req, res) => {
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

// Edit Book API
app.put("/book/:id", async (req, res) => {
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






// ---- Hard coded data & API ----
const courses = [
    { id: 1, name: "math", durationInMonths: 4 },
    { id: 2, name: "Computer", durationInMonths: 3 },
    { id: 3, name: "Science", durationInMonths: 2 },
];

// app.get("/courses", (req, res) => {
//     // "/courses" route pe GET request aaye to yeh function execute hoga.
//     res.json({
//         isSuccessful: true,
//         data: courses,
//     });
//     // Hum response mein courses ka data bhej rahe hain, jo JSON format mein return hoga.
// });

// app.get("/courses/:id", (req, res) => {
//     // Yeh route ek single course ko fetch karne ke liye hai.
//     const id = parseInt(req.params.id); // Request se id ko integer mein convert kar rahe hain.
//     const result = courses.find((x) => x.id === id);
//     // "find" method se hum array mein se us course ko dhundh rahe hain jiska id match ho.

//     if (!result) {
//         // Agar course nahi mila to 404 status code ke saath message bhej rahe hain.
//         res.status(404).json({
//             isSuccessful: false,
//             data: null,
//             message: "No data found",
//         });
//     } else {
//         // Agar course mil gaya to us course ka data return kar rahe hain.
//         res.json({
//             isSuccessful: true,
//             data: result,
//         });
//     }
// });


// app.post("/courses", (req, res) => {
//     // "/courses" route pe POST request aaye to yeh function execute hoga.
//     const body = req.body; // Request body mein jo data aaya hai, usse store kar rahe hain.

//     if (!body.name || !body.durationInMonths) {
//         // Agar body mein name ya durationInMonths nahi diya gaya ho to error bhej rahe hain.
//         return res.status(400).json({
//             isSuccessful: false,
//             message: "Invalid request body. 'name' and 'durationInMonths' are required.",
//         });
//     }

//     const obj = {
//         id: courses.length + 1,
//         // Naye course ka id assign karte hain, jo current array ke length se 1 zyada hoga.
//         name: body.name,
//         durationInMonths: body.durationInMonths,
//     };

//     courses.push(obj);
//     // Naye course ko array mein add kar rahe hain.

//     res.status(201).json({
//         isSuccessful: true,
//         data: obj, // Created course ka data response mein bhej rahe hain.
//         message: "Course added successfully",
//     });
// });

