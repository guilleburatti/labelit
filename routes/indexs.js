var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {

    var obj = JSON.parse(fs.readFileSync('volunteerSerchesArgentinaChile', 'utf8'));
    console.log(obj[1])
    res.render('error',{ title:'error!', message:'Error! sesion expirada! \n Para continuar por favor presione el boton de abajo', buttonMsg:'volver a la pagina principal'})
}
)
  