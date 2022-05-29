  const router = require('express').Router();
  //   const cubes = require('../db.json');
  const cubeService = require('../services/cubeService')


  router.get('/', (req, res) => {
      let { search, from, to } = req.query;
      //   console.log(search, from, to)
      const cubes = cubeService.getAll(search, from, to);
      res.render('index', { cubes })
  });

  router.get('/about', (req, res) => {
      res.render('about')
  });


  module.exports = router;