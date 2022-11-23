const Excercise = require('../models/excercise');

// Display list of all Excercises
const excercise_list = async (req, res, next) => {
  try {
    const list_excercises = await Excercise.find()
      .populate('category')
      .populate('body_part');
    return res.json(list_excercises);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Get details of one Excercise
const excercise_detail = async (req, res) => {
  try {
    const excercise = await Excercise.findById(req.params.id)
      .populate('category')
      .populate('body_part');
    return res.json(excercise);
  } catch (err) {
    return res.json({ message: err.message });
  }
};
module.exports = { excercise_list, excercise_detail };
