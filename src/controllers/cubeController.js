const router = require('express').Router();
const cubeService = require('../services/cubeService')
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async(req, res) => {
    const cube = req.body;
    cube.owner = req.user._id;


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
    const cube = await cubeService.getOneDetails(req.params.id).lean()
        // console.log(cube)
    const isOwner = cube.owner == req.user._id;
    res.render('details', { cube, isOwner })
});

router.get('/:cubeId/attach-accessory', async(req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean()
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('accessory/attach', { cube, accessories })
});

router.post('/:cubeId/attach-accessory', async(req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId)
    res.redirect(`/cube/details/${req.params.cubeId}`)
});

router.get('/:cubeId/edit', isAuth, async(req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();
    console.log(cube.owner)
    console.log(req.user._id)
    if (cube.owner != req.user._id) {
        return res.redirect('/404');
    }

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;
    if (!cube) {
        return res.redirect('/404')
    }
    res.render('cube/edit', { cube })
});

router.post('/:cubeId/edit', async(req, res) => {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body)
// console.log(modifiedCube)
    res.redirect(`/cube/details/${modifiedCube._id}`)
});

router.get('/:cubeId/delete', async(req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    res.render('cube/delete', { cube })
        //TODO: add is owner validation
});
router.post('/:cubeId/delete', async(req, res) => {
    await cubeService.delete(req.params.cubeId);
    res.redirect('/')

})
module.exports = router;