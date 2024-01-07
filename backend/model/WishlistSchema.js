
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    products: []
});

module.exports = mongoose.model('Wishlist', wishlistSchema);