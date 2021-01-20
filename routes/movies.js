const express = require('express');
const Movie = require('./../models/movie.model');

const router = new express.Router();

router.get('/create', (req, res, next) => {
  res.render('movies/create');
});

router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => next(error));
});

router.post('/', (req, res, next) => {
  const data = req.body;
  Movie.create({
    name: data.name,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => res.redirect('/movies'))
    .catch((error) => {
      res.redirect('/movies/create');
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => next(error));
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Movie.findByIdAndUpdate(id, {
    name: data.name,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => res.redirect('/movies'))
    .catch((error) => next(error));
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch((error) => next(error));
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => next(error));
});

module.exports = router;
