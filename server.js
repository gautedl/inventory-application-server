const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const catalogRouter = require('./routes/catalog');

const app = express();

// Connect to mongoose
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use('/catalog', catalogRouter);

// app.get('/api', (req, res) => {
//   res.json({ users: ['userOne', 'userTwo'] });
// });

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
