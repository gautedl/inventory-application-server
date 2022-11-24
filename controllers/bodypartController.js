const BodyPart = require('../models/bodypart');
const Excercise = require('../models/excercise');

// Display list of all Body Parts
const bodypart_list = async (req, res, next) => {
  try {
    const list_bodyparts = await BodyPart.find().sort([['name', 'ascending']]);
    return res.json(list_bodyparts);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Find excercises by body part
const bodypart_detail = async (req, res) => {
  try {
    Promise.all([
      await BodyPart.findById(req.params.id),
      await Excercise.find({ body_part: req.params.id })
        .populate('category')
        .populate('body_part'),
    ]).then((result) => {
      const data = {
        body_part: result[0],
        excercises: result[1],
      };
      return res.json(data);
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
module.exports = { bodypart_list, bodypart_detail };
