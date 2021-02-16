const jwt = require('jsonwebtoken');
const User = require('../models/User');

//controlla se l'utente è loggato, controllando se c'è il jwt nei cookies ed è valido
const requireAuth = (req, res, next) => {

    if(!req.cookies){
        res.redirect('/login');
        return;
    }
    
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}


//Ottiene dati utente
const getUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                //trova utente nel db e lo inserisce nella risposta
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    getUser
};