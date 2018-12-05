var express = require('express');
var router = express.Router();

router.get('/:userId?', function(req, res,next) {
  userId = req.params.userId
  var cookie = req.cookies[userId];
  if (cookie === undefined)
  {
    console.log('\n \n No encontro las cookies en el label \n \n')
    res.render('error',{userId:userId,message:'Estuviste mas de media hora inactivo, por favor vuelva a la pagina principal para continuar!', title:'Sesion caducada'})
    console.log('\n \n despuesde render \n \n')

  }
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
    uSess.productos= cookie.productos
    uSess.etiquetas= cookie.etiquetas
    uSess.cssEtiquetas = cookie.cssEtiquetas
    uSess.id= cookie.id
    uSess.cantidadColumnas = cookie.cantidadColumnas
    res.render('labels', uSess)
  } 
})
module.exports = router;
