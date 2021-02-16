const {
    Router
} = require('express');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const competitionController = require('../controllers/competitionController');
const {
    requireAuth
} = require('../middleware/authMiddelware');
const {
    upload
} = require('../middleware/imageMiddelware');

const router = Router();

//User routes
router.get('/signup',requireAuth, authController.signup_get);
router.post('/signup',requireAuth, authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout',requireAuth, authController.logout_get);

//ARTICOLI
//mostra form di scrittura articolo
router.get('/createBlog',requireAuth, blogController.blog_create_get);
//mostra lista blog
router.get('/blogs', blogController.blog_get);
//invio articolo
router.post('/blogs',requireAuth, upload, blogController.blog_create_post);
//msotra dettagli articolo
router.get('/blogs/:id', blogController.blog_details);
//elimina articolo
router.delete('/blogs/:id',requireAuth, blogController.blog_delete);

//COMPETIZIONI
//mostra pagina input gara
router.get('/createCompetition', requireAuth, competitionController.competition_create_get );
//invia dati gara
router.post('/competitions',requireAuth, competitionController.competition_create_post );
//mostra gare
router.get('/competitions', competitionController.competition_get );
 

module.exports = router;