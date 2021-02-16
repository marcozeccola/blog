const Blog = require('../models/Blog');
const querystring = require('querystring');
const url = require('url');

//pagina creazione documento
module.exports.blog_create_get = async (req, res) => {
  res.render('createBlog', {
    title: 'Scrivi articolo'
  });
}

//rendering dei documenti ordinati per creazione con eventuali filtri
module.exports.blog_get= async (req, res) => {
  try {
    let result;
    const queryStr = url.parse(req.url, true).search;
    //se c'è una query string
    if (queryStr) {
      //parse argomenti query string
      const search = querystring.parse(queryStr.substring(1));
      //se c'è una categoria nella query string cerca documenti con quella categoria
      if (search.category) {
        result = await Blog.find({
          category: search.category
        }).sort({
          createdAt: -1
        });
      }
    } else {
      //se non c'è query string renderizza tutti glia rticoli
      result = await Blog.find().sort({
        createdAt: -1
      });
    }

    res.render('blogs', {
      blogs: result,
      title: 'Articoli'
    });

  } catch (error) {
    console.log(error);
  }
}

//rendering dettagli 
module.exports.blog_details = async (req, res) => {
  const id = req.params.id;

  try {

    const result = await Blog.findById(id);

    res.render('details', {
      blog: result,
      title: 'Dettagli'
    });

  } catch (error) {
    console.log(error);
  }
}

const filterPath = (value) => {
  return value.path;
}
//creazione documento nel db
module.exports.blog_create_post = async (req, res) => {
  //array dei path delle immagini
  const image = req.files.filter(filterPath);
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    author: req.body.author,
    category: req.body.category,
    image: image
  });

  try {

    const result = await blog.save();
    res.redirect('/blogs');

  } catch (error) {
    console.log(error);
  }
}

//eliminazione documento
module.exports.blog_delete = async (req, res) => {
  const id = req.params.id;

  try {

    const result = await Blog.findByIdAndDelete(id);
    res.json({
      redirect: '/blogs'
    });

  } catch (error) {
    console.log(error);
  }
}