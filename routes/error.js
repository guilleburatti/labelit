var express = require('express');
var router = express.Router();

router.get('/:userId',function(req, res, next) {
        var userId = req.params.userId
        if (userId == undefined) {
                userId = ''
        }
        res.render('error',{link:'/',userId:''})   

})

module.exports = router;
