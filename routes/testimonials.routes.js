const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialsController.getAll);

router.route('/testimonials/random').get(TestimonialsController.getRandom);

router.route('/testimonials/:id').get(TestimonialsController.getById);

router.route('/testimonials').post(TestimonialsController.addTestimonial);

router.route('/testimonials/:id').put(TestimonialsController.updateTestimonial);

router.route('/testimonials/:id').delete(TestimonialsController.deleteTestimonial);

module.exports = router;
