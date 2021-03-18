const mongoose = require('mongoose')
const Schema = mongoose.Schema;
UserSchema = new Schema({
    name: String,
    role: String,
    address:String,
    cars:[{
        type: Schema.Types.ObjectId,
        ref:'Car'
    }]
})
module.exports = mongoose.model('User', UserSchema)