const passportLocal = require('passport-local')
const userModel = require('../DAOs/models/userModel')
const cartModel = require('../DAOs/models/cartModel')
const { isValidPassword } = require('../utils/passwordHash')

const LocalStrategy = passportLocal.Strategy

const loginLocalStrategy = new LocalStrategy(
  { usernameField: 'email' }, async (username, password, done) => {
    try {
      let user = await userModel.findOne({ username }).populate('cart')

      if (!user) {
        console.log('El usuario no existe en el sistema')
        return done(null, false, { 
          message: 'El usuario no existe en el sistema' 
        })
      }

      if (!isValidPassword(password, user.password)) {
        return done(null, false, { 
            message: 'Datos incorrectos' 
        })
      }

      if (!user.cart) {
        const newCart = await cartModel.create({
            name: 'default'
        })

        await userModel.updateOne({ _id: user._id}, {cart: newCart._id })
    }
      done(null, user)
    } catch (e) {
        return done(e)
    }
  }
)

module.exports = loginLocalStrategy