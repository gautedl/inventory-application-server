const Excercise = require('../models/excercise');
const { body, validationResult } = require('express-validator');

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

// Create new Excercise
const excercise_create = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description').optional({ checkFalsy: true }),

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      const excercise = new Excercise({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        body_part: req.body.body_part,
      });
      try {
        const savedExcercise = await excercise.save();
        return res.json(savedExcercise);
      } catch (err) {
        return res.json({ message: err.message });
      }
    }
  },
];

const excercise_update = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description').optional({ checkFalsy: true }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        const updateExcercise = await Excercise.updateOne(
          { _id: req.params.id },
          {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            body_part: req.body.body_part,
            _id: req.params.id,
          }
        );
        return res.json(updateExcercise);
      } catch (err) {
        return res.json({ message: err.message });
      }
    }
  },
];

const excercise_delete = async (req, res) => {
  try {
    const deleteExcercise = await Excercise.findByIdAndDelete(req.params.id);
    return res.json(deleteExcercise);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = {
  excercise_list,
  excercise_detail,
  excercise_create,
  excercise_update,
  excercise_delete,
};
