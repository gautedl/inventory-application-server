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

module.exports = { category_list };
