const Competition = require('../models/Competition');
const querystring = require('querystring');
const url = require('url');

//pagina creazione documento
module.exports.competition_create_get = async (req, res) => {
     res.render('createCompetition', {
          title: 'Aggiungi gara'
     });
}

//crea oggetto con i dati inseriti da filtrare (solo se inseriti)
const filtraGara = (search )=>{
     let campi = new Array();
     let campiName = new Array();
     let filtrato = {};

     if (search.type != '') {
          campi.push(search.type);
          campiName.push("type");
     }
     if (search.year != '') {
          campi.push(parseInt(search.year));
          campiName.push("year");
     }
     if (search.category != '') {
          campi.push(search.category);
          campiName.push("category");
     }
     if (search.sex != '') {
          campi.push(search.sex);
          campiName.push("sex");
     }
     campiName.forEach((key, i) => filtrato[key] = campi[i]);
     return filtrato;
}
//mostra gare con eventuali filtri 
module.exports.competition_get = async (req, res) => {

     try {
          let result;
          const queryStr = url.parse(req.url, true).search;
          //se c'è una query string
          if (queryStr) {
               //parse argomenti query string
               const search = querystring.parse(queryStr.substring(1));
               
               //query con oggetto con argomenti della query String
               result = await Competition.find(filtraGara(search)).sort({
                    year: -1
               });

          } else {
               //se non c'è query string mostra tutte le gare
               result = await Competition.find().sort({
                    year: -1
               });
          }

          res.render('competitions', {
               competitions: result,
               title: 'Gare'
          });

     } catch (error) {
          console.log(error);
     }
}

//creazione documento nel db
module.exports.competition_create_post = async (req, res) => {


     const competition = new Competition({
          type: req.body.type,
          year: req.body.year,
          place: req.body.place,
          category: req.body.category,
          sex: req.body.sex,
          gold: {
               Name: req.body.goldName,
               Surname: req.body.goldSurname,
               State: req.body.goldState
          },
          silver: {
               Name: req.body.silverName,
               Surname: req.body.silverSurname,
               State: req.body.silverState
          },
          bronze: {
               Name: req.body.bronzeName,
               Surname: req.body.bronzeSurname,
               State: req.body.bronzeState
          }
     });

     try {
          const result = await competition.save();
          res.redirect('/competitions');

     } catch (error) {
          console.log(error);
     }
}