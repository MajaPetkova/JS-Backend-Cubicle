const router = require('express').Router();
const cubeService = require('../services/cubeService')


router.get('/create', (req, res) => {
    res.render('create')
});

router.post('/create', async(req, res) => {
    const cube = req.body;
    //Validate
    if (cube.name == '') {
        res.status(404).send('Please insert name')
        return
    }
    //save data
    try {
        await cubeService.save(cube)
        res.redirect('/')

    } catch (error) {
        res.status(400).send(err)

    }
});

router.get('/details/:id', (req, res) => {
    res.render('details')
})
module.exports = router;