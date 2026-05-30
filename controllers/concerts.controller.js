const Concert = require('../models/concert.model');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findOne({ id: req.params.id });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const concert = new Concert({ id: getRandomId(), performer, genre, price, day, image });
    await concert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    await Concert.findOneAndUpdate({ id: req.params.id }, { performer, genre, price, day, image }, { runValidators: true });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    await Concert.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
