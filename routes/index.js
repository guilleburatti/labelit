var express = require('express');
var router = express.Router();
uSess = {}



/* GET home page. */
router.get('/', function(req, res, next) {

  var cookie = req.cookies.labelit;
  if (cookie === undefined)
  {
    uSess.productos= []
    uSess.etiquetas= 0
    uSess.cssEtiquetas = ''
    uSess.cantidadColumnas = 0
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    uSess.id=randomNumber.substring(2,randomNumber.length);
    res.cookie('labelit',uSess, { maxAge: 4500000, httpOnly: false });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    uSess.productos= cookie.productos
    uSess.etiquetas= cookie.etiquetas
    uSess.cssEtiquetas = cookie.cssEtiquetas
    uSess.cantidadColumnas = cookie.cantidadColumnas
    uSess.id = cookie.id
    console.log('cookie exists', cookie);
  } 
  console.log('cantidad de productos> ' + uSess.productos.length)
  res.render('index', { title: 'Labelit',
                        etiquetas:uSess.etiquetas,cantEtiquetas: uSess.productos.length,productos:uSess.productos});
});

router.post('/items',function(req, res, next) {
  if (req.body.accion == 'add'){
    producto = {};
    producto.descripcion =req.body.descripcion;
    producto.precio = req.body.precio;
  uSess.productos.push(producto)
  console.log(uSess.productos)
  }
  else if (req.body.accion == 'del'){
    posicion =  req.body.pos
    console.log('la posicion deberia de ser'+ posicion)
    console.log('saco' + uSess.productos[posicion].descripcion)
    uSess.productos.splice(posicion,1)
  }
  else if (req.body.accion == 'delAll'){
    uSess.productos = [];
    uSess.etiquetas = 0
  }
  else if(req.body.etiquetas){
    console.log('encontro etiquetas '+ req.body.etiquetas)
    uSess.etiquetas = req.body.etiquetas;
    switch (uSess.etiquetas) {
      case '1':
        uSess.cantidadColumnas = 1
        uSess.cssEtiquetas = 'labels25x18'
        break;
    
      case '2':
        uSess.cantidadColumnas = 1
        uSess.cssEtiquetas = 'labels18x12'
        break;
      case '10':
        uSess.cantidadColumnas = 2
        uSess.cssEtiquetas = 'labels9x5'
        break;      
      case '12':
        uSess.cantidadColumnas = 2
        uSess.cssEtiquetas = 'labels8x4'
        break;
      case '21':
        uSess.cantidadColumnas = 3
        uSess.cssEtiquetas = 'labels6x3'
        break;
    }
  }
  res.cookie('labelit',uSess, { maxAge: 45000, httpOnly: false });
  res.status(200).send(uSess.productos)
});

module.exports = router;



