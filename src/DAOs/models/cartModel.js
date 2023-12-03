const mongoose = require('mongoose')
const { Schema } = require('./userModel')

 const cartSchema  = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users'  //este va igual que como lo puse en userModel
  // }
  name: String

 })
 module.exports= mongoose.model('carts', cartSchema)