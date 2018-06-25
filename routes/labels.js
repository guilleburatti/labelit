var express = require('express');
var router = express.Router();

router.get('/', function(req, res,next) {
  var cookie = req.cookies.labelit;
  if (cookie === undefined)
  {
    res.redirect('/')
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
    uSess.productos= cookie.productos
    uSess.etiquetas= cookie.etiquetas
    uSess.id= cookie.id
    res.render('labels', uSess)
  } 
})
module.exports = router;
