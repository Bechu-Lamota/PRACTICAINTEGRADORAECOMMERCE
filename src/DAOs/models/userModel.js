const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts'
  }
})
module.exports  = mongoose.model('users', userShema)