var express = require('express');
var router = express.Router();

router.get('/:userId?',function(req, res, next) {
        console.log('entre al router de cigarros en el get')

    var listaPreciosCigarros = {
        "cigarrillo": [
          {
            "nombre": "L&M Red KS",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "L&M Blue KS",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "L&M Blue 100's",
            "preciCompra": 0,
            "precioVenta": 45
          },
          {
            "nombre": "Marlboro Mega Box 20",
            "preciCompra": 0,
            "precioVenta": 45
          },
          {
            "nombre": "Marlboro Red box 20",
            "preciCompra": 71.57,
            "precioVenta": 80
          },
          {
            "nombre": "MarlBoro Red KS 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Marlboro Red Compacto",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Marlboro red box 10",
            "preciCompra": 36.26,
            "precioVenta": 45
          },
          {
            "nombre": "Marlboro Gold Original Box",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Marlboro Touch Box (Compacto)",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "MarlBoro Ice Blast Box 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "MarlBoro Ice Blast Box 10",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "MarlBoro Fusion Blast Box 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "MarlBoro Fusion Blast Box 10",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Particulares KS",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Baisha KS",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Imparciales 100's",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Benson & Hedges Box",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Parliament RCB",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Virginia Super Slim",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Philip Morris box 20",
            "preciCompra": 67.75,
            "precioVenta": 75
          },
          {
            "nombre": "Philip Morris KS 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Philip Morris box 10",
            "preciCompra": 35.31,
            "precioVenta": 45
          },
          {
            "nombre": "Philip Morris CAPS box 20",
            "preciCompra": 67.75,
            "precioVenta": 75
          },
          {
            "nombre": "Philip Morris CAPS box 10",
            "preciCompra": 35.31,
            "precioVenta": 45
          },
          {
            "nombre": "Chesterfield Red Box 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Chesterfield red KS 20",
            "preciCompra": 58.21,
            "precioVenta": 65
          },
          {
            "nombre": "Chesterfield red BOX 15",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Chesterfield red BOX 10",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Chesterfield Fresh BOX 20",
            "preciCompra": 0,
            "precioVenta": 0
          },
          {
            "nombre": "Chesterfield Fresh BOX 10",
            "preciCompra": 0,
            "precioVenta": 0
          }
        ]
      }

        var userId = req.params.userId
        if (userId == undefined) {
            console.log('entre al if undefined')

                userId = ''
                res.render('error',{link:'/',userId:''})   
        }
        else {
        res.render('cigarros',{userId:userId,listaPreciosCigarros:listaPreciosCigarros})  
        }

})

module.exports = router;
