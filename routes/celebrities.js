const express = require('express');
const Celebrity = require('./../models/celebrity.model');

const router = new express.Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => next(error));
});

module.exports = router;
