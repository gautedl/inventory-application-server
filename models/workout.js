const mongoose = require('mongoose');

const Schema = mongoose.Schema;

WorkoutSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  excercises: [{ type: Schema.Types.ObjectId, ref: 'Excercise' }],
  description: { type: String },
});

WorkoutSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/workout/${this._id}`;
});

module.exports = mongoose.model('Workout', WorkoutSchema);
