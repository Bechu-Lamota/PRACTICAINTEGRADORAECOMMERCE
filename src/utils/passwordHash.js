const bcrypt = require('bcrypt')

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) //Lo va a iterar 10 veces hasta tener un hash resultante
}

const isValidPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword) // password: contraseña en texto plano. y hashedPassword: contraseña hasheada
}

module.exports = {
  createHash,
  isValidPassword
}