//ESTRATEGIA OPTADA: JWT
const passport = require('passport');
const userModel = require('../DAOs/models/userModel');
const loginLocalStrategy = require('../strategies/loginLocalStrategy');
const registerLocalStrategy = require('../strategies/registerLocalStrategy');
const gitHubStrategy = require('../strategies/gitHubStrategy');
const jwtStrategy = require('../strategies/jwtStrategy');

const initializePassport = () => {
    passport.use('jwt', jwtStrategy)
    passport.use('register', registerLocalStrategy)
    passport.use('userLogin', loginLocalStrategy)
    passport.use('github', gitHubStrategy)

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id).populate('cart');
        return done(null, user);
    });
}


module.exports = initializePassport;