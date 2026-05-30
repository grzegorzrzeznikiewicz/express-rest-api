const Testimonial = require('../models/testimonial.model');

const getRandomId = () => Math.floor(Math.random() * 1000000000);

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ id: req.params.id });
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testimonial = new Testimonial({ id: getRandomId(), author, text });
    await testimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    await Testimonial.findOneAndUpdate({ id: req.params.id }, { author, text }, { runValidators: true });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
