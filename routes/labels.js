var express = require('express');
var router = express.Router();
var session =  require('express-session') ;



router.get('/', function(req, res,next) {
  if (session.activa === true){
    json = session.productos
    td = 'labels8x4'
    tr = 'labels8x4'
    res.render('labels',{json,td,tr})
  }
  else{

    res.redirect('/')
  }
})
module.exports = router;
