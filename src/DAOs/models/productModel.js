const mongoose = require('mongoose')
//const paginate = require('mongoose-paginate-v2')

const productSchema = mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    code: {
        type: String,
        unique: true
    },
    stock: Number
})

//productSchema.plugin(paginate)

module.exports = mongoose.model('products', productSchema)