const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    variants: [{
        ram: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        
    },
    description: {
        type: String,
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
