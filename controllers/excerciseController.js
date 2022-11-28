const Excercise = require('../models/excercise');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

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
  body('img_url').optional({ checkFalsy: true }),

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
        img_url: req.body.img_url,
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
  body('img_url').optional({ checkFalsy: true }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        if (req.body.password !== process.env.REACT_APP_PASSWORD) {
          return res.json('Wrong Password');
        }
        const updateExcercise = await Excercise.updateOne(
          { _id: req.params.id },
          {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            body_part: req.body.body_part,
            img_url: req.body.img_url,
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json(errors.array());
  }
  try {
    if (req.body.password == process.env.REACT_APP_PASSWORD) {
      const deleteExcercise = await Excercise.findByIdAndDelete(req.params.id);
      return res.json(deleteExcercise);
    } else {
      return res.json('Wrong Password');
    }
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
