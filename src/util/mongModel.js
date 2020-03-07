var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var model = mongoose.model('userInfo', new Schema({
    username : String,
    password : String,
    // Email : String,
    // name : String,
    // photoPath : String
}))

module.exports = model;
