const express = require('express');
const router = express.Router();
const db = require('../db');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find((item) => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  db.testimonials.push({
    id: getRandomId(),
    author,
    text,
  });

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const item = db.testimonials.find((testimonial) => testimonial.id == req.params.id);

  if (item) {
    item.author = req.body.author;
    item.text = req.body.text;
  }

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex((item) => item.id == req.params.id);

  if (index !== -1) {
    db.testimonials.splice(index, 1);
  }

  res.json({ message: 'OK' });
});

module.exports = router;

