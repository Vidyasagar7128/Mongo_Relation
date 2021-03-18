const mongoose = require('mongoose')
const Schema = mongoose.Schema;
CarSchema = new Schema({
    name: String,
    model: String,
    price: Number,
    seller:{
        type:String,
        ref:'User'
    }
    // Schema.Types.ObjectId
})
module.exports = mongoose.model('Car', CarSchema)