var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Labelit',
                        producto: [] });
});
router.get('/labels', function(req, res, next) {
  res.render('labels', {
    etiquetas: [{descripcion: 'Hola', precio: '$15'},
               {descripcion: 'Chau', precio: '$10'}]
   });
});

module.exports = router;
