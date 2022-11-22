const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const bodypart_controller = require('../controllers/bodypartController');
const excercise_controller = require('../controllers/excerciseController');
const workout_controller = require('../controllers/workoutController');

/// CATEGORY ROUTES ///
router.get('/categories', category_controller.category_list);

/// BODY PART ROUTES ///
router.get('/body_parts', bodypart_controller.bodypart_list);

/// EXCERCISE ROUTES ///
router.get('/excercises', excercise_controller.excercise_list);

/// WORKOUT ROUTES ///
router.get('/workouts', workout_controller.workout_list);

module.exports = router;