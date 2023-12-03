const { Router } = require('express')
const { io } = require('../utils/app')
const ProductManager = require('../DAOs/managers/productManager')
const { verifyToken } = require('../utils/jwt')

const viewsRouter = Router()
const productManager = new ProductManager()


viewsRouter.get('/products', (req, res, next) => {
    if (!req.user) {
        return res.redirect('userLogin')
    }
    return next()
}, async (req, res) => {
    const products = await productManager.getProducts()

    res.render('products/products', {products})
})

const userchatnames = []

viewsRouter.get('/login', (req, res) => {
  return res.render('login')
})

viewsRouter.post('/login', (req, res) => {
  const user = req.body
  const userchatname = user.name

  userchatnames.push(userchatname)
      console.log({ userchatname })
  io.emit('newUser', userchatname) 

  return res.redirect(`/chat?username=${userchatname}`)
})

viewsRouter.get('/chat', (req, res) => {
  return res.render('index')
})

//SESSIONS
/*
const sessionMiddleware = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile')
  }

  return next()
}
*/
viewsRouter.get('/register', /*sessionMiddleware,*/ (req, res) => {
    return res.render('register')
})

viewsRouter.get('/userLogin', /*sessionMiddleware,*/ (req, res) => {
  const error = req.flash('error')[0]
  console.log({ error })
  return res.render('userLogin', { 
    error,
    hasError: error !== undefined
  })
})

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
      return res.status(401).json({
        error: 'Necesitas enviar un token de acceso'
      })
    }
    try {
      const payload = await verifyToken(token)
  
      req.user = payload.user
    } catch (e) {
      return res.status(401).json({
        error: 'Token de acceso invalido'
      })
    }
    return next()
  }
 

viewsRouter.get('/profile', authMiddleware, (req, res, next) => {
    //return res.json(req.user)
    if (!req.session.user) { //Nos verifica la session, la autenticacion
      return res.redirect('/userLogin')
    }
    return next()
  }, (req, res) => {
    const user = req.session.user
    return res.render('profile', { user })
  })

//ACTIVIDAD RECUPERO DE CONTRASEÑA
viewsRouter.get('/recovery-password', (req, res) => {
  const error = req.flash('error')[0]
  console.log({ error })
  return res.render('recovery-password', { 
    error,
    hasError: error !== undefined
  })
 }) 

module.exports = viewsRouter