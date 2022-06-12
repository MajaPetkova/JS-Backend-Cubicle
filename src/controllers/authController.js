const router = require('express').Router();
const authService = require('../services/authService');
const { sessionName } = require('../constants')

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async(req, res) => {
    const createdUser = await authService.register(req.body);

    if (createdUser) {
        res.redirect('/auth/login')

    } else {
        // todo: add notification
        res.redirect('404')
    }
    // console.log(createdUser)

});

router.get('/login', (req, res) => {
    res.render('auth/login')
});
router.post('/login', async(req, res) => {
    let token = await authService.login(req.body)
        // console.log(req.body);

    if (!token) {
        return res.redirect('404')
    }
    res.cookie(sessionName, token, { httpOnly: true });
    res.redirect('/')
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/')
});

module.exports = router;