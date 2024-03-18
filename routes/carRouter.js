const express = require("express");


const router = express.Router();

const carController = require("../Controller/carController")

router.route('/')
.get(carController.pingServer)

router.route('/cars/')
.get(carController.lengthCarsData)
.post(carController.newCarsData);


router.route('/cars/:id')
.get(carController.getCarsById)
.put(carController.updateCarsData)
.delete(carController.deleteCarsData);

module.exports = router;