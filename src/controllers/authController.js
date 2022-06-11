const router = require('express').Router();
const authService = require('../services/authService');


router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async(req, res) => {
    const createdUser= await authService.register(req.body);

    if(createdUser){
        res.redirect('/auth/login')

    }else{
        // todo: add notification
        res.redirect('404')
    }
// console.log(createdUser)

});
module.exports = router;