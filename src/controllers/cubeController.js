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
        await cubeService.create(cube)
        res.redirect('/')

    } catch (error) {
        res.status(400).send(err)

    }
});

router.get('/details/:id', async(req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean()
    console.log(cube)
    res.render('details', { cube })
})
module.exports = router;