const Seat = require('../models/seat.model');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

const emitSeats = async req => {
  req.io.emit('seatsUpdated', await Seat.find({}));
};

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findOne({ id: req.params.id });
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const isTaken = await Seat.exists({ day, seat });

    if (isTaken) {
      return res.status(409).json({ message: 'The slot is already taken...' });
    }

    const newSeat = new Seat({ id: getRandomId(), day, seat, client, email });
    await newSeat.save();
    await emitSeats(req);

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const updatedSeat = await Seat.findOneAndUpdate({ id: req.params.id }, { day, seat, client, email }, { runValidators: true });

    if (updatedSeat) {
      await emitSeats(req);
    }

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findOneAndDelete({ id: req.params.id });

    if (seat) {
      await emitSeats(req);
    }

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
