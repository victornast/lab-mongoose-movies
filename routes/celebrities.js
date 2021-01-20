const express = require('express');
const Celebrity = require('./../models/celebrity.model');

const router = new express.Router();

router.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => next(error));
});

router.post('/', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => res.redirect('/celebrities'))
    .catch((error) => {
      res.redirect('/celebrities/create');
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => next(error));
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Celebrity.findByIdAndUpdate(id, {
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => res.redirect('/celebrities'))
    .catch((error) => next(error));
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
    .then(() => res.redirect('/celebrities'))
    .catch((error) => next(error));
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      switch (celebrity.occupation) {
        case 'actor':
          celebrity.isActor = 'true';
          break;
        case 'singer':
          celebrity.isSinger = 'true';
          break;
        case 'commedian':
          celebrity.isCommedian = 'true';
          break;
        case 'unknown':
          celebrity.isUnknown = 'true';
          break;
      }
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => next(error));
});

module.exports = router;
