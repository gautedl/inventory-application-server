const Workout = require('../models/workout');

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

module.exports = { workout_list, workout_detail };
