const mongoose = require('mongoose');

const BodyPartSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  //   excercise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Excercise' }],
});

BodyPartSchema.virtual('url').get(function () {
  return `/catalog/bodypart/${this._id}`;
});

module.exports = mongoose.model('BodyPart', BodyPartSchema);
