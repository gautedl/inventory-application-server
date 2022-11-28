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

function excerciseCreate(name, category, description, bodyPart, img, cb) {
  excercisedetail = {
    name: name,
    category: category,
  };

  if (description != false) excercisedetail.description = description;
  if (bodyPart != false) excercisedetail.body_part = bodyPart;
  if (img != false) excercisedetail.img_url = img;

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

function workoutCreate(title, description, excercise, img, cb) {
  workoutdetail = { title: title };

  if (excercise != false) workoutdetail.excercises = excercise;
  if (description != false) workoutdetail.description = description;
  if (img != false) workoutdetail.img_url = img;

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
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/deadlift-workout-for-back-royalty-free-image-527680187-1553003041.jpg?resize=980:*',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Squat',
          categories[0],
          'Put weight on your shoulders and squat.',
          [bodyparts[2]],
          'https://static.strengthlevel.com/images/illustrations/squat-1000x1000.jpg',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Bench press',
          categories[0],
          'Lie down and lift a barbell up and down.',
          [bodyparts[1]],
          'https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Seated Cable Rows',
          categories[0],
          'Row that weight.',
          [bodyparts[0]],
          'https://static.strengthlevel.com/images/illustrations/seated-cable-row-1000x1000.jpg',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Intervals',
          categories[1],
          'Run for a short period, walk, and then run again.',
          false,
          'https://www.wikihow.com/images/thumb/3/36/Do-an-Interval-Run-Step-15.jpg/aid11979738-v4-1200px-Do-an-Interval-Run-Step-15.jpg',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Weighted Pull ups',
          categories[0],
          'Strap weights around your waist and pull yourself up.',
          [bodyparts[0], bodyparts[4]],
          'https://i.pinimg.com/originals/c5/c3/7f/c5c37fbe4f451da36c4ab7df41420e0b.png',
          callback
        );
      },
      function (callback) {
        excerciseCreate(
          'Pull ups',
          categories[2],
          'Pull yourself up.',
          [bodyparts[0], bodyparts[4]],
          'https://hips.hearstapps.com/hmg-prod/images/u05-bottomhalfwaytop-ism-mh310118-1558552383.jpg?crop=1.00xw:0.812xh;0,0.0812xh&resize=480:*',
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
          'https://thumbs.dreamstime.com/b/sport-inspiring-workout-fitness-gym-motivation-quote-illustration-creative-strong-vector-rough-typography-grunge-wallpaper-160353323.jpg',
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
