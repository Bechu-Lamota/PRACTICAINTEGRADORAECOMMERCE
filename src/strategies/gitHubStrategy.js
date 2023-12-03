const GitHubStrategy = require('passport-github2')
const userModel = require('../DAOs/models/userModel')
const { generateToken } = require('../utils/jwt')

const gitHubStrategy = new GitHubStrategy({
    clientID: 'Iv1.326fe12ae6221d33',
    clientSecret: '2c08da9a1b5e6ced187beed93b0355221d446489',
    callbackURL: 'http://localhost:8080/api/sessions/github-callback'
}, async (accessToken, refreshToken, profile, done) => {

  try {
    let user = await userModel.findOne({ username: profile._json.login })

    if (user) {
      console.log('Usuario ya existe')
      const token = generateToken(user)

      user = user.toObject()
      user.access_token = token
      console.log({ user })
      return done(null, user)
    }
    
    const newUser = await userModel.create({
      username: profile._json.login,
      name: profile._json.name
    })

    const token = generateToken(newUser)
    console.log({ token })
    return done(null, {
      ...newUser,
      access_token: token
    })
  } catch (e) {
    return done(e)
  }
})

module.exports = gitHubStrategy