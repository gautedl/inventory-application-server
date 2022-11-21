const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
  body_part: [{ type: Schema.Types.ObjectId, ref: 'BodyPart' }],
});

ExcerciseSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/Excercise/${this._id}`;
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);
