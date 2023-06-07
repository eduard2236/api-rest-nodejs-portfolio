const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
},{
    timestamps:true
});
module.exports = mongoose.model('User' , userSchema);