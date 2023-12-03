const { Router } = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwt');
const { passportCall } = require('../config/passport.call')

const sessionRouter = new Router();

sessionRouter.get('/', (req, res) => {
    if (!req.session.counter) {
      req.session.counter = 1
      req.session.name = req.query.name
  
      return res.json(`Bienvenido ${req.session.name}`)
    } else {
      req.session.counter++
  
      return res.json(`${req.session.name} has visitado la página ${req.session.counter} veces`)
    }
  })

sessionRouter.post('/register', 
  passport.authenticate('register', { failureRedirect: '/register' }), 
  async (req, res) => {
    return res.status(201).redirect('/api/sessions/current');
})

sessionRouter.get('/failregister', (req, res) => {
    return res.json({
      error: 'Error al registrarse'
    })
  })

sessionRouter.post('/userLogin', 
passport.authenticate('userLogin', { failureRedirect: '/userLogin', failureFlash: true }),
 async (req, res) => {
    //return res.send(req.user)
    const token = generateToken({
        name: req.user.name,
        email: req.user.email,
        role: 'USER'
    })
    
    return res.cookie('authToken', token, {
        maxAge: 60 * 60 * 1000
    }).redirect('/api/sessions/current');
    //.redirect('/products');
})


sessionRouter.post('/recovery-password', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
  
    if (!user) {
      return res.status(401).json({
        error: 'El usuario no existe en el sistema'
      })
    }
    const newPassword = createHash(req.body.password)
    await userModel.updateOne({ email: user.email }, { password: newPassword })
  
    return res.redirect('/userLogin')
  })

sessionRouter.get('/current', passportCall('jwt'), (req, res) => {
    return res.json({
        user: req.user,
        session: req.session
    })
})
     //INGRESO CON GITHUB
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {
    return res.redirect('/api/products')
})
       
sessionRouter.get('/github-callback', passport.authenticate('github', { failureRedirect: '/userLogin', failureFlash: true }), async (req, res) => {
     //return res.json(req.user) //cambia
     return res.redirect('/api/products')
     })

module.exports = sessionRouter