const passportLocal = require('passport-local')
const userModel = require('../DAOs/models/userModel')
const { createHash } = require('../utils/passwordHash')

const LocalStrategy = passportLocal.Strategy

const registerLocalStrategy = new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
    try {

        const existUser = await userModel.findOne({ email: username });
        // console.log()
        if (existUser) {
            console.log('ya existe');
            return done(null, false);
        }

        const newUser = {
            name: req.body.name,
            email: username,
            password: createHash(password),
        }

        const usuario = await userModel.create(newUser);
        return done(null, usuario);
    } catch (error) {
        return done(error);
    }
}
)

module.exports = registerLocalStrategy