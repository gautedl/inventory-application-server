#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
const async = require('async');
const Workout = require('./models/workout');
const Excercise = require('./models/excercise');
const Category = require('./models/category');
const BodyPart = require('./models/bodypart');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const workouts = [];
const excercises = [];
const categories = [];
const bodyparts = [];

function categoryCreate(name, cb) {
  categoryDetail = { name: name };

  const category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function bodyPartCreate(name, cb) {
  bodyPartDetail = { name: name };

  const bodyPart = new BodyPart(bodyPartDetail);

  bodyPart.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Body Part: ' + bodyPart);
    bodyparts.push(bodyPart);
    cb(null, bodyPart);
  });
}

function excerciseCreate(name, category, description, bodyPart, cb) {
  excercisedetail = {
    name: name,
    category: category,
  };

  if (description != false) excercisedetail.description = description;
  if (bodyPart != false) excercisedetail.body_part = bodyPart;

  const excercise = new Excercise(excercisedetail);
  excercise.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Excercise: ' + excercise);
    excercises.push(excercise);
    cb(null, excercise);
  });
}

function workoutCreate(title, description, excercise, cb) {
  workoutdetail = { title: title };

  if (excercise != false) workoutdetail.excercises = excercise;
  if (description != false) workoutdetail.description = description;

  const workout = new Workout(workoutdetail);

  workout.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Workout: ' + workout);
    workouts.push(workout);
    cb(null, workout);
  });
}

function createCategoryBodyParts(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate('Weights', callback);
      },
      function (callback) {
        categoryCreate('Cardio', callback);
      },
      function (callback) {
        categoryCreate('Body Weight', callback);
      },
      function (callback) {
        bodyPartCreate('Back', callback);
      },
      function (callback) {
        bodyPartCreate('Chest', callback);
      },
      function (callback) {
        bodyPartCreate('Legs', callback);
      },
      function (callback) {
        bodyPartCreate('Shoulders', callback);
      },
      function (callback) {
        bodyPartCreate('Biceps', callback);
      },
      function (callback) {
        bodyPartCreate('Triceps', callback);
      },
      function (callback) {
        bodyPartCreate('Abs', callback);
      },
      function (callback) {
        bodyPartCreate('Forearms', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createExcercises(cb) {
  async.parallel(
    [
      function (callback) {
        excerciseCreate(
          'Deadlift',
          categories[0],
          'Pick up weight from floor, put it down again.',
          [bodyparts[0], bodyparts[2]],
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Squat',
          categories[0],
          'Put weight on your shoulders and squat.',
          [bodyparts[2]],
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Bench press',
          categories[0],
          'Lie down and lift a barbell up and down.',
          [bodyparts[1]],
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Seated Cable Rows',
          categories[0],
          'Row that weight.',
          [bodyparts[0]],
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Intervalls',
          categories[1],
          'Run for a short period, walk, and then run again.',
          false,
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Weighted Pull ups',
          categories[0],
          'Strap weights around your wais and pull yourself up.',
          [bodyparts[0], bodyparts[4]],
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Pull ups',
          categories[2],
          'Pull yourself up.',
          [bodyparts[0], bodyparts[4]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createWorkout(cb) {
  async.parallel(
    [
      function (callback) {
        workoutCreate(
          'A little bit of everything',
          'Test Workout',
          [...excercises],
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createCategoryBodyParts, createExcercises, createWorkout],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Workouts: ' + workouts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
