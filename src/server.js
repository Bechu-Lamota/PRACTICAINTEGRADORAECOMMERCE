const { app } = require('./utils/app')
const productsRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const sessionRouter = require('./routers/sessionRouter')

app.use('/api/products', productsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)


