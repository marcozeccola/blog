const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winSchema = new Schema({
    Name: {
      type: String,
      required: true,
    },
    Surname: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    }
});

const competitionSchema = new Schema({
  type: {
    type:String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true
  },
  gold: winSchema,
  silver: winSchema,
  bronze: winSchema
} );
 

const Competition = mongoose.model('Competition', competitionSchema);
module.exports = Competition;