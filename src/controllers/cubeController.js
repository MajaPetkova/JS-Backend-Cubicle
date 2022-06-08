const router = require('express').Router();
const cubeService = require('../services/cubeService')
const accessoryService = require('../services/accessoryService')

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
        // console.log(cube)
    res.render('details', { cube })
});

router.get('/:cubeId/attach-accessory', async(req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean()
    const accessories = await accessoryService.getAll().lean();

    res.render('accessory/attach', { cube, accessories })
});

router.post('/:cubeId/attach-accessory', async(req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId)
    res.redirect(`/cube/details/${req.params.cubeId}`)
})
module.exports = router;