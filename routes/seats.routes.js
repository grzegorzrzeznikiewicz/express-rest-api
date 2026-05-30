const express = require('express');
const router = express.Router();
const db = require('../db');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const isTaken = db.seats.some((item) => Number(item.day) === Number(day) && Number(item.seat) === Number(seat));

  if (isTaken) {
    return res.status(409).json({ message: 'The slot is already taken...' });
  }

  db.seats.push({
    id: getRandomId(),
    day,
    seat,
    client,
    email,
  });

  req.io.emit('seatsUpdated', db.seats);

  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find((seat) => seat.id == req.params.id);

  if (item) {
    item.day = req.body.day;
    item.seat = req.body.seat;
    item.client = req.body.client;
    item.email = req.body.email;
    req.io.emit('seatsUpdated', db.seats);
  }

  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex((item) => item.id == req.params.id);

  if (index !== -1) {
    db.seats.splice(index, 1);
    req.io.emit('seatsUpdated', db.seats);
  }

  res.json({ message: 'OK' });
});

module.exports = router;
