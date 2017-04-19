'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const movies = require('./data/movies');
const users = require('./data/users');
const cookieSession = require('cookie-session');

const app = express();
const db = low(`${__dirname}/data/db.json`, {
  storage: fileAsync
});
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  next(new Error('User is not logged in.'));
};

app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['whatever', 'unicorn', 'vire'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('localhost') || origin.includes('chrome-extension')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed origin!'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());


app.post('/login', function (req, res) {
  const data = req.body;

  if (data.username && data.password) {
    const user = db
      .get('users')
      .find((u) => u.username === data.username && u.password === data.password)
      .value();

    if (!user) {
      return res.status(401).send({error: {message: 'Bad credentials'}})
    }

    req.session.user = {
      username: data.username
    };
    return res.send({ok: true});
  }

  const message = 'Bad request - you need to provide username & password';
  res.status(400).send({error: {message}});
});

app.get('/movies', function (req, res, next) {
  if (Math.random() > 0.9) {
    return next(new Error('Ooops, server is down, panic NOW!'));
  }

  const movies = db.get('movies');

  res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = db.get('movies')
    .find({id: +req.params.id})
    .value();

  if (!movie) {
    res.status(404).send({error: {message: 'Movie not found'}});
  }

  setTimeout(() => res.send(movie), 1000);
});

app.get('/orders', isLoggedIn, (req, res) => {
  const userOrders = db
    .get(['orders', req.session.user.username])
    .value();

  res.send(userOrders || []);
});

app.post('/orders', isLoggedIn, function (req, res, next) {
  const username = req.session.user.username;
  const data = req.body;

  if (!(data.movieId && data.noOfTickets)) {
    const message = 'Bad request - you need to provide "movieId" & "noOfTickets"';

    return res.status(400).send({error: {message}});
  }

  const movie = db.get('movies')
    .find({id: +data.movieId})
    .value();

  if (!movie) {
    const message = 'Bad request - invalid "movieId"';

    return res.status(400).send({error: {message}});
  }

  if (data.noOfTickets > movie.availableSeats) {
    const message = 'Bad request - not enough seats.';

    return res.status(400).send({error: {message}});
  }

  const index = db.get('movies')
    .findIndex({id: +data.movieId});
  const availableSeats = movie.availableSeats - data.noOfTickets;
  const order = {
    id: Math.random().toString(16).substr(2),
    movieId: movie.id,
    noOfTickets: data.noOfTickets
  };

  db
    .set(['movies', index], Object.assign({}, movie, {availableSeats}))
    .update(['orders', username], (orders) => orders ? orders.concat(order) : [order])
    .write()
    .then(() => res.send(order), next);
});

app.delete('/orders/:id', isLoggedIn, function (req, res, next) {
  const username = req.session.user.username;
  const id = req.params.id;

  const order = db.get(['orders', username]).find({id}).value();

  if (!order) {
    return res
      .status(400)
      .send({error: {message: 'Trying to delete non-existing order'}})
  }

  const index = db.get('movies')
    .findIndex({id: order.movieId});

  db
    .update(
      ['movies', index],
      (movie) => Object.assign({}, movie, {availableSeats: movie.availableSeats + order.noOfTickets})
    )
    .get(['orders', username])
    .remove(order => order.id === id)
    .write()
    .then(() => res.send({ok: true}),next);
});

app.use(function (err, req, res, next) {
  res
    .status(500)
    .send({
      error: {
        message: 'Internal server error',
        detail: err.message
      }
    });
});

db.defaults({movies, orders: {}, users})
  .write()
  .then(() => {
    app.listen(5000, () => console.log('Server is listening'))
  });
