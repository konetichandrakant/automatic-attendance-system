const express = require('express')
const router = express.Router();
const { studentDetails, courseDetails } = require('../details');
const { isLoggedIn } = require('../logInValidation');

router.get('/', isLoggedIn, async (req, res) => {
  const studentId = req['userId'];
  const studentData = await studentDetails(studentId);
  console.log(studentId);

  if (!studentData)
    return res.send({ valid: false });

  res.send({ valid: true, studentId: studentId, courses: studentData['courses'] });
})

router.get('/:courseId', isLoggedIn, async (req, res) => {
  const { courseId } = req.params;

  const studentId = req['userId'];
  const courseData = await courseDetails(courseId);
  const studentData = await studentDetails(studentId);

  if (!studentData)
    res.send({ valid: false })

  if (!courseData)
    return res.send({ valid: false, type: 'student' });

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i]['studentId'] === studentId) {
      return res.send({
        courseId: courseData['courseId'],
        courseName: courseData['courseName'],
        year: courseData['year'],
        semester: courseData['semester'],
        teacherId: courseData['teacherId'],
        teacherName: courseData['teacherName'],
        studentName: studentData['name'],
        studentId: studentId,
        studentAttendance: courseData['students'][i]['classesAttended'],
        teacherAttendance: courseData['classesTaken']
      });
    }
  }

  return res.send(false);
})

module.exports = { studentRoutes: router };