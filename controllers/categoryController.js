const Excercise = require('../models/excercise');
const Category = require('../models/category');

// Display list of all Categories
const category_list = async (req, res, next) => {
  try {
    const list_categories = await Category.find().sort([['name', 'ascending']]);
    return res.json(list_categories);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Find excercises by category
const category_detail = async (req, res) => {
  try {
    Promise.all([
      await Category.findById(req.params.id),
      await Excercise.find({ category: req.params.id })
        .populate('category')
        .populate('body_part'),
    ]).then((result) => {
      const data = {
        category: result[0],
        excercises: result[1],
      };
      return res.json(data);
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = { category_list, category_detail };
