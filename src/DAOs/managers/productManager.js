const productModel = require('../models/productModel')

class productManager {
    constructor() {
        this.model = productModel
    }

    async getProducts(){
        try{
           const products = await this.model.find()

           return products.map(p => p.toObject())
           
        } catch (e) {
            console.log('Error al obtener los productos', e )
            return []
        }
    }
    
    async getProductById(id) {
        try{
            return this.model.findById(id)
        } catch (e) {
            console.log('Error al obtener el producto', e )
        }
    }

    async addProduct(body){
        try{
            return this.model.create({
                title: body.title,
                price: body.price,
                code: body.code,
                stock: body.stock
            })
        } catch (e) {
            console.log('Error al obtener el producto', e )
        }
    }

    async updateProduct(id, body){
        const product = await this.getProductById(id)

        if (!product) {
            throw new Error('Producto inexistente')
        }

        const productUpdate = {
            _id: product._id,
            title: body.title || product.title,
            price: body.price || product.price,
            code: body.code || product.code,
            stock: body.stock || product.stock
        }
        await this.model.updateOne({ _id: id }, productUpdate)

        return productUpdate
    }

    async deleteProduct(id){
        const product = await this.getProductById(id)

        if (!product) {
            throw new Error('Producto inexistente')
        }

        await this.model.deleteOne({ _id: id })

        return true
    }

}

module.exports = productManager