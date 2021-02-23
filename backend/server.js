const express = require('express');
const cors = require('cors');//cors stands for cross-origin resource sharing; it allows AJAX requests to skip the Same-origin policy and access resources from remote hosts. The cors package provides an Express middleware that can enable CORS with different options.
const mongoose = require('mongoose');

require('dotenv').config()//dotenv loads environment variables from a .env file into process.env. This makes development simpler. Instead of setting environment variables on our development machine, they can be stored in a file. (We’ll create the .env file later.)

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
        
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
//The section useNewUrlParser: true is added because the MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings. Because this is such a big change, they put the new connection string parser behind a flag. 
//The section useCreateIndex: true is similar. It is to deal with MongoDB deprecating the ensureIndex() function.
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

