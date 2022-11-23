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

module.exports = { workout_list };
