const Workout = require('../models/workout');

// Display list of all workouts
const workout_list = async (req, res, next) => {
  try {
    const list_workouts = await Workout.find().populate('excercises');

    return res.json(list_workouts);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = { workout_list };
