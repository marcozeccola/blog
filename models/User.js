const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    isEmail
} = require('validator');

//schema del modello User con messaggi di errore
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email obbligatoria'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Email non valida']
    },
    password: {
        type: String,
        required: [true, 'Password obbligatoria'],
        minlength: [6, 'Password deve essere di almeno 6 caratteri']
    },
});

//metodo per loggare utente
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

//hash della password prima salvataggio doc nel db
userSchema.pre('save', async function (next) {
    //hash della password con salt generato
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    //per passare al prossimo mw
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;