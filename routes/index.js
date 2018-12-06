var express = require('express');
var router = express.Router();
var fs = require('fs');
var bcrypt = require('bcrypt');
const saltRounds = 16;
uSess = {}


router.get('/help/:userId?', function(req, res, next) {
/*  var obj = JSON.parse(fs.readFileSync('volunteerSerchesArgentinaChile.json', 'utf8'));
  var hashes = ['123456','1234567','12345678','123456789','password','123123','chachi','contraseña','0123456789','qwerty','televisor','angela','654321','1234567890']
  for (let index = 0; index < obj.length; index++) {
    if (obj[index]['user']['login_type'] == 'email'){
      //console.log(obj[index]['user']['email'])
      for (let brute = 0; brute < hashes.length; brute++) {
        bcrypt.compare(hashes[brute], obj[index]['user']['password'], function(err, res) {
        if (res == true){
          console.log(res)
          console.log(obj[index]['user']['email'] + '  y pass>   ' + hashes[brute])
        }
    });
    }
    
  }
}*/
  var userId = req.params.userId

  res.render('help',{userId:userId})
})

router.get('/about/:userId?', function(req, res, next) {
    var userId = req.params.userId
  res.render('about',{userId:userId})
})


/* GET home page. */
router.get('/:userId?', function(req, res, next) {
  var CryptoJS = require("crypto-js");

var ciphertext = CryptoJS.RC4Drop.encrypt('aaaaaa', '230eb878-5066-46bf-94b3-5c52efb64dbe');
console.log("encrypted text dES", ciphertext.toString());


  var userId = req.params.userId
  if (userId === undefined)
  { 
    uSess.productos= []
    uSess.etiquetas= 0
    uSess.cssEtiquetas = ''
    uSess.cantidadColumnas = 0
    var randomNumber=Math.random().toString();
    userId = uSess.id=parseInt(randomNumber.substring(2,randomNumber.length));
    res.cookie(uSess.id,uSess, { maxAge: 1000*60*60*24, httpOnly: false });
    res.locals.id = uSess.id
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
    var cookie = req.cookies[userId]|| undefined;
    if (cookie !== undefined)
    { 
    // yes, cookie was already present 
    res.render('index', { title: 'Labelit',
                          etiquetas: cookie.etiquetas,
                          cantEtiquetas: cookie.productos.length,
                          productos: cookie.productos,
                          userId:cookie.id});
    }
    else{
      mensaje = "La sesion ha expirado, esto significa que paso mucho tiempo desde la ultima vez que nos visitaste, los datos se guardan durante 24 horas en el servidor, luego de eso se borran. \n Estams trabajando para mejorar la pagina, cualquier comentario que necesites hacer puedes hacerlo mediante los datos brindados en la seccion <a href='/about'>about</a> \n para Volver a crear etiquetas presiona el boton de abajo."
      res.render('error',{ title:'error!', message:mensaje, buttonMsg:'volver a la pagina principal', userId:''})
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

  }
  else if(req.body.etiquetas){
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
  res.cookie(userId,cookiePost, { maxAge: 1000*60*60*6, httpOnly: false });
  res.status(200).send(cookiePost.productos)


});

module.exports = router;



