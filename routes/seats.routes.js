const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.route('/seats').get(SeatsController.getAll);

router.route('/seats/:id').get(SeatsController.getById);

router.route('/seats').post(SeatsController.addSeat);

router.route('/seats/:id').put(SeatsController.updateSeat);

router.route('/seats/:id').delete(SeatsController.deleteSeat);

module.exports = router;
