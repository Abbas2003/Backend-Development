const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
