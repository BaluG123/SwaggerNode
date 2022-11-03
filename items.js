const mongoose = require('mongoose');
const ItemsShceme = new mongoose.Schema(
    {BookName:String,Author:String,Price:Number,id:Number}
)

module.exports = mongoose.model("items",ItemsShceme)