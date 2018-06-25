var express = require('express');
var router = express.Router();
uSess = {}



/* GET home page. */
router.get('/:userId?', function(req, res, next) {
  console.log('el usuario es: ' + userId)

  var userId = req.params.userId
  if (userId === undefined)
  { 
    uSess.productos= []
    uSess.etiquetas= 0
    uSess.cssEtiquetas = ''
    uSess.cantidadColumnas = 0
    var randomNumber=Math.random().toString();
    uSess.id=parseInt(randomNumber.substring(2,randomNumber.length));
    res.cookie(uSess.id,uSess, { maxAge: 1000*60*30, httpOnly: false });
    console.log(uSess)
    console.log('cookie created successfully');
    res.render('index', { title: 'Labelit',
                          etiquetas:uSess.etiquetas,
                          cantEtiquetas: uSess.productos.length,
                          productos:uSess.productos,
                          userId:uSess.id});
  } 
  else
  {
    console.log(req.cookies[userId])
    var cookie = req.cookies[userId]|| undefined;
    if (cookie !== undefined)
    { 
    // yes, cookie was already present 
    res.render('index', { title: 'Labelit',
                          etiquetas: cookie.etiquetas,
                          cantEtiquetas: cookie.productos.length,
                          productos: cookie.productos,
                          userId:cookie.id});
    console.log('cookie exists', cookie);
    }
    else{
      res.render('error',{ title:'error!', message:'Error! sesion expirada!', buttonMsg:'volver a la pagina principal'})
        }
  } 
});

router.post('/items/:userId?',function(req, res, next) {
  var userId = req.params.userId
  var cookiePost = req.cookies[userId]
  if (req.body.accion == 'add'){
    producto = {};
    producto.descripcion =req.body.descripcion;
    producto.precio = req.body.precio;
  cookiePost.productos.push(producto)
  }
  else if (req.body.accion == 'del'){
    posicion =  req.body.pos
    console.log('la posicion deberia de ser'+ posicion)
    console.log('saco' + req.cookies[userId].productos[posicion].descripcion)
    cookiePost.productos.splice(posicion,1)
  }
  else if (req.body.accion == 'delAll'){
    cookiePost.productos.length= 0;
    cookiePost.etiquetas = 0
    cookiePost.cssEtiquetas = ''
    cookiePost.cantidadColumnas = 0
    console.log('la cookie borrada essssss \n')
    console.log(cookiePost)

  }
  else if(req.body.etiquetas){
    console.log('encontro etiquetas '+ req.body.etiquetas)
    cookiePost.etiquetas = req.body.etiquetas;
    switch (cookiePost.etiquetas) {
      case '1': 
      cookiePost.cantidadColumnas = 1
      cookiePost.cssEtiquetas = 'labels25x18'
        break;
    
      case '2':
        cookiePost.cantidadColumnas = 1
        cookiePost.cssEtiquetas = 'labels18x12'
        break;
      case '10':
        cookiePost.cantidadColumnas = 2
        cookiePost.cssEtiquetas = 'labels9x5'
        break;      
      case '12':
        cookiePost.cantidadColumnas = 2
        cookiePost.cssEtiquetas = 'labels8x4'
        break;
      case '21':
        cookiePost.cantidadColumnas = 3
        cookiePost.cssEtiquetas = 'labels6x3'
        break;
    }
  }
  res.cookie(userId,cookiePost, { maxAge: 1000*60*30, httpOnly: false });
  res.status(200).send(cookiePost.productos)
  res.status(500).send('session perdida!')
  res.status(4).send('session perdida!')

});

module.exports = router;



