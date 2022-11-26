const Workout = require('../models/workout');
const { body, validationResult } = require('express-validator');

// Display list of all workouts
const workout_list = async (req, res, next) => {
  try {
    const list_workouts = await Workout.find()
      .populate([
        {
          path: 'excercises',
          populate: { path: 'body_part' },
        },
      ])
      .populate([
        {
          path: 'excercises',
          populate: { path: 'category' },
        },
      ]);
    // .populate('excercises')
    // .populate('category')
    // .populate('body_part');

    return res.json(list_workouts);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Get details of one Workout
const workout_detail = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate([
        {
          path: 'excercises',
          populate: { path: 'body_part' },
        },
      ])
      .populate([
        {
          path: 'excercises',
          populate: { path: 'category' },
        },
      ]);
    return res.json(workout);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Create new Workout
const workout_create = [
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description').optional({ checkFalsy: true }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      const workout = new Workout({
        title: req.body.title,
        excercises: req.body.excercises,
        description: req.body.description,
      });
      try {
        const savedWorkout = await workout.save();
        return res.json(savedWorkout);
      } catch (err) {
        return res.json({ message: err.message });
      }
    }
  },
];

// Update Workout
const workout_update = [
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description').optional({ checkFalsy: true }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        const updateWorkout = await Workout.updateOne(
          { _id: req.params.id },
          {
            title: req.body.title,
            excercises: req.body.excercises,
            description: req.body.description,
            _id: req.params.id,
          }
        );
        return res.json(updateWorkout);
      } catch (err) {
        return res.json({ message: err.message });
      }
    }
  },
];

const workout_delete = async (req, res) => {
  try {
    const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
    return res.json(deleteWorkout);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = {
  workout_list,
  workout_detail,
  workout_create,
  workout_update,
  workout_delete,
};
