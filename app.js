const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { getUser } = require('./middleware/authMiddelware');
const routes = require('./routes/routes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5400;
//middleware
app.use('/uploads',express.static('uploads'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//views engine
app.set('view engine', 'ejs');

//connessione db
const dbURI = 'mongodb+srv://marco:ciao@blog.0ofpd.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) => {
    //server in attesa alla porta 5400
    app.listen(PORT)
  })
  .catch((err) => console.log(err));

//Routes
//in ogni documento richiesta dati utente
app.get('*', getUser);
app.get('/', (req, res) => res.render('home', {
  title: 'Home'
}));
app.use(routes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404'
  });
});