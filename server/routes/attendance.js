const express = require('express');
const router = express.Router();

const { Course } = require('../model/Course')
const { courseDetails } = require('../details');
const student = require('./student');

router.post('/student-attendance', async (req, res) => {
  const { studentId, courseId, dateAndTime } = req.body;
  const courseData = await courseDetails(courseId);
  console.log(courseData);
  if (courseData === null)
    return res.send({ valid: false });
  let changed = false;
  for (let i = 0; i < courseData['students'].length; i++) {
    console.log(courseData['students'][i]['studentId'] === studentId)
    if (courseData['students'][i]['studentId'] === studentId) {
      courseData['students'][i]['classesAttended'].push(dateAndTime);
      changed = true;
      break;
    }
  }
  if (changed) {
    await Course.findOneAndUpdate({ courseId: courseId }, courseData);
    return res.send('added successfully');
  }
  return res.send('no student');
})

router.post('/teacher-attendance', async (req, res) => {
  const { teacherId, courseId, dateAndTime } = req.body;
  const courseData = await courseDetails(courseId);
  console.log(courseData)
  if (!courseData || courseData['teacherId'] !== teacherId)
    return res.send({ valid: false });
  courseData['classesTaken'].push(dateAndTime);
  await Course.findOneAndUpdate({ courseId: courseId }, courseData)
  return res.send('added successfully');
})

module.exports = { attendanceRoutes: router };