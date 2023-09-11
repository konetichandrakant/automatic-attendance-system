const express = require('express')
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Student } = require('../model/Student');
const { Teacher } = require('../model/Teacher');

dotenv.config();

router.post('/login', async (req, res) => {
  const { userId, password, type } = req.body;

  if (type === 'teacher') {
    try {
      const userData = await Teacher.findOne({ userId: userId });
      if (userData === null || userData['password'] !== password)
        return res.send({ token: null });
    } catch {
      return res.send({ token: null });
    }
  } else {
    try {
      const userData = await Student.findOne({ userId: userId });
      console.log(userData);
      if (userData === null || userData['password'] !== password)
        return res.send({ token: null });
    } catch (error) {
      return res.send({ token: null });
    }
  }
  const token = jsonwebtoken.sign({
    userId: userId,
    type: type
  }, process.env.ACCESS_TOKEN)
  res.send({ token: token })
})

router.post('/register', (req, res) => {
  const { userId, password, userName, type } = req.body;
  let token = jsonwebtoken.sign({ userId: userId, type: type }, ACCESS_TOKEN, { algorithm: 'HS256' })

  const user = new Student({ userId: userId, password: password, userName: userName })
  res.send({ token: token, valid: true });
})

module.exports = { loginResgiterRoutes: router }