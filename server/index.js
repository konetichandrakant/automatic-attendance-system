const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { studentRoutes } = require('./routes/student');
const { attendanceRoutes } = require('./routes/attendance');

app.use(cors())
const { teacherRoutes } = require('./routes/teacher');
const { loginResgiterRoutes } = require('./routes/loginRegister');
const mongoose = require('mongoose')

dotenv.config();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log('connected!!') })
  .catch(() => { console.log('error') });

const PORT = process.env.PORT;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// tokens validation and sending the id to the next level

app.use(loginResgiterRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use(attendanceRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}...`);
})