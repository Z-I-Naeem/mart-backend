const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
    image:{type:String},
    parentId: {
        type: String,
        unique: true
    }



}, {timestamps: true})

module.exports = mongoose.model('Category',categorySchema)
