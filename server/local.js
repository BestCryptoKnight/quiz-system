const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const fileupload = require("express-fileupload");

const port = 5000
app.use(fileupload());
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// const uri = process.env.DRIVING_URI || 'mongodb+srv://drivingschool:3eUdrvjYGaTeibQ8@cluster0.sfea2sq.mongodb.net/myFirstDatabase';
const uri = 'mongodb://localhost:27017/DrivingSchool'

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Mongoose is connected."));
} catch (e) {
  console.log("Can not connect.");
}

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo DB success')
})

const Routes = require('./routes/index')
app.use('/api', Routes)

app.listen(port, () => {
  console.log(`Server is listenting at http://localhost:${port}`)
})

