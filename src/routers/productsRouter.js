const {Router} = require('express')
const ProductManager = require('../DAOs/managers/productManager')
const productRouter = Router()

const productManager = new ProductManager()

productRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    res.json(products)
})

productRouter.get('/:pid', async (req, res) => {
    const pid = req.params.pid //    const {pid} = req.params

    const products = await productManager.getProductById(pid)

    res.json(products)
})

productRouter.post('/', async (req, res) => {
    const body = req.body

    const product = await productManager.addProduct(body)

    res.status(201).json(product)
})

productRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const body = req.body

    const products = await productManager.updateProduct(pid, body)

    res.json(products)
})

productRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params

    try {
        const products = await productManager.deleteProduct(pid)

        res.json(products)
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
})

module.exports = productRouter