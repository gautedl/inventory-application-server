const BodyPart = require('../models/bodypart');

// Display list of all Categories
const bodypart_list = async (req, res, next) => {
  try {
    const list_bodyparts = await BodyPart.find().sort([['name', 'ascending']]);
    return res.json(list_bodyparts);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = { bodypart_list };
