const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
        
    },
    offer: {
        type: Number,
        
    },
    productPicture: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    updatedAt: Date,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}



}, {timestamps: true})

module.exports = mongoose.model('Product',productSchema)
