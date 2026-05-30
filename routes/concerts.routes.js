const express = require('express');
const router = express.Router();
const db = require('../db');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((item) => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  db.concerts.push({
    id: getRandomId(),
    performer,
    genre,
    price,
    day,
    image,
  });

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const item = db.concerts.find((concert) => concert.id == req.params.id);

  if (item) {
    item.performer = req.body.performer;
    item.genre = req.body.genre;
    item.price = req.body.price;
    item.day = req.body.day;
    item.image = req.body.image;
  }

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex((item) => item.id == req.params.id);

  if (index !== -1) {
    db.concerts.splice(index, 1);
  }

  res.json({ message: 'OK' });
});

module.exports = router;

