const User = require('../models/User')
const jwt = require('jsonwebtoken');

//durata di vita cookies (3 giorni)
const maxAge = 259200;

//Ritorna oggetto con come chiave i valori dei campi e come valore l'errore corrispettivo
const handleErrors = (err) => {
  //oggetto dove verranno inseriti errori corrispondenti al campo
  let errorObj = {
    email: '',
    password: ''
  };

  //email sbagliata
  if (err.message === 'incorrect email') {
    errorObj.email = 'Email non corretta';
  }

  //password sbagliata
  if (err.message === 'incorrect password') {
    errorObj.password = 'Password non corretta';
  }


  //se l'email e' gia stata inserita
  //non si può inserire un custom error nello schema per il campo unique bisogna quindi gestirlo in questo modo
  if (err.code === 11000) {
    errorObj.email = 'Già registrato con questa mail';
    return errorObj;
  }

  //se ci sono errori di validazione
  if (err.message.includes('user validation failed:')) {
    //aggiorna errorObj con messaggio di errore corrispettivo
    Object.values(err.errors).forEach(({
      properties
    }) => {
      errorObj[properties.path] = properties.message;
    });
  }

  return errorObj;
}
//ritorna JSONwebtoken
const createToken = (id) => {
  //crea token con come payload l'id dell'utente
  return jwt.sign({
    id
  }, process.env.SECRET_KEY, {
    expiresIn: maxAge
  })
}

module.exports.signup_get = (req, res) => {
  res.render('signup', { 
    title: 'SignUp'
  });
}

module.exports.login_get = (req, res) => {
  res.render('login', { 
    title: 'Login'
  });
}

module.exports.signup_post = async (req, res) => {

  //destruct dell'oggetto in email e psw
  const {
    email,
    password
  } = req.body;

  //crea nuovo utente 
  try {
    const user = await User.create({
      email,
      password
    });

    //jwt
    const token = createToken(user._id);

    //aggiunge ai cookies il jwt, visibile solo da server e con una durata di vita massima
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    });

    //aggiunge alla risposta status code Created e l'id utente
    res.status(201).json({
      user: user._id
    });
  } catch (err) {

    const errors = handleErrors(err);
    //aggiunge alla risposta status code Bad Request e oggetto con errori
    res.status(400).json({
      errors
    });
  }

}

module.exports.login_post = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  //logga utente
  try {
    //logga utente
    const user = await User.login(email, password);
    //jwt
    const token = createToken(user._id);
    //aggiunge ai cookies il jwt, visibile solo da server e con una durata di vita massima
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    });
    //aggiunge alla risposta status code OK e user id
    res.status(200).json({
      user: user._id
    });
  } catch (err) {
    const errors = handleErrors(err);
    //aggiunge alla risposta status code Bad Request e oggetto errori
    res.status(400).json({
      errors
    });
  }
}

module.exports.logout_get = (req, res)=>{
  //elimina cookie
  res.cookie('jwt', '', {maxAge: 1});
  //redirect alla home
  res.redirect('/');
}