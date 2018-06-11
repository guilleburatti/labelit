var express = require('express');
var router = express.Router();
var session =  require('express-session') ;
session.activa = true
session.productos= []
session.etiquetas= 0
/* GET home page. */
router.get('/', function(req, res, next) {
  sess = session;
  console.log(session.productos)
  res.render('index', { title: 'Labelit',
                        producto: session.productos,etiquetas:session.etiquetas });
});
router.post('/items',function(req, res, next) {
  producto = {};
  producto.descripcion =req.body.descripcion;
  producto.precio = req.body.precio;
  if (req.body.accion == 'add'){
  session.productos.push(producto)
  console.log('agrego' + producto)
  console.log(session.productos)
  }
  else if (req.body.accion == 'del'){
    session.productos.splice(session.productos.indexOf(producto))
    console.log('saco' + producto)
    console.log(session.productos)
  }
  else if (req.body.accion == 'delAll'){
    session.productos = [];
    session.etiquetas = 0
  }
  else if(req.body.etiquetas){
    session.etiquetas = req.body.etiquetas;
  }
  res.send(session.productos)
});

module.exports = router;



