const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const bodypart_controller = require('../controllers/bodypartController');
const excercise_controller = require('../controllers/excerciseController');
const workout_controller = require('../controllers/workoutController');

/// CATEGORY ROUTES ///
router.get('/category/:id', category_controller.category_detail);
router.get('/categories', category_controller.category_list);

/// BODY PART ROUTES ///
router.get('/body_part/:id', bodypart_controller.bodypart_detail);
router.get('/body_parts', bodypart_controller.bodypart_list);

/// EXCERCISE ROUTES ///
router.post('/excercise/create', excercise_controller.excercise_create);
router.post('/excercise/:id/update', excercise_controller.excercise_update);
router.get('/excercise/:id', excercise_controller.excercise_detail);
router.get('/excercises', excercise_controller.excercise_list);

/// WORKOUT ROUTES ///
router.post('/workout/create', workout_controller.workout_create);
router.post('/workout/:id/update', workout_controller.workout_update);
router.get('/workout/:id', workout_controller.workout_detail);
router.get('/workouts', workout_controller.workout_list);

module.exports = router;
