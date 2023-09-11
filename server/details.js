const { Student } = require('./model/Student');
const { Teacher } = require('./model/Teacher');
const { Course } = require('./model/Course');

// all get data functions
const teacherDetails = async (id) => {
  return await Teacher.findOne({ userId: id });
}

const studentDetails = async (id) => {
  return await Student.findOne({ userId: id });
}

const courseDetails = async (id) => {
  return await Course.findOne({ courseId: id });
}

// all post data functions
const addCourse = async (courseId, courseName, semester, year, teacherId) => {
  var course = new Course({ courseId: courseId, courseName: courseName, semester: semester, year: year, teacherId: teacherId, classesTaken: [], students: [] });
  await course.save();
  var teacherData = await teacherDetails(teacherId);
  teacherData['courses'].push(courseId);
  return await Teacher.findOneAndUpdate({ userId: teacherId }, teacherData)
}

const addStudentInCourse = async (courseId, studentId) => {
  // Add student in course
  var courseData = await courseDetails(courseId);
  courseData['students'].push({ studentId: studentId, classesAttended: [] });
  await Course.findOneAndUpdate({ courseId: courseId }, courseData, { upsert: true })

  // Add course in student
  var studentData = await studentDetails(studentId);
  if (studentData === null)
    studentData = { userId: studentId, courses: [] }
  studentData['courses'].push(courseId);
  await Student.findOneAndUpdate({ userId: studentId }, studentData, { upsert: true })

  let data = {
    courseName: courseData['courseName'],
    year: courseData['year'],
    semester: courseData['semester'],
    classesTaken: courseData['classesTaken'],
    students: []
  };

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i]['studentId'] !== null)
      data['students'].push({ studentId: courseData['students'][i]['studentId'], noOfClassesAttended: courseData['students'][i]['classesAttended'].length });
  }
  return data;
}

const addStudent = async (studentId, password, email, phoneNumber) => {
  await Student.findByIdAndUpdate(studentId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

const addTeacher = async (teacherId, password, email, phoneNumber) => {
  await Teacher.findByIdAndUpdate(teacherId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

// all update data functions
const changeStudentPassword = async (studentId, password, newPassword) => {
  const studentDetails = await Student.findById(studentId);
  if (!studentDetails || studentDetails['password'] !== password)
    return false;
  await Student.findByIdAndUpdate(studentId, { password: newPassword });
  return true;
}

const changeTeacherPassword = async (teacherId, password, newPassword) => {
  const teacherData = await Teacher.findById(teacherId);
  if (!teacherData || teacherData['password'] !== password)
    return false;
  await Teacher.findByIdAndUpdate(teacherId, { password: newPassword });
  return true;
}

const studentAttendance = async (studentId, courseId, dateAndTime) => {
  // add attendance in course
  const courseData = await courseDetails(courseId);

  for (let i = 0; i < courseData['courses'].length; i++) {
    if (courseData['courses'][i]['studentId'] === studentId) {
      courseData['courses'][i]['classesAttended'].push(dateAndTime);
      break;
    }
  }

  Course.findOneAndUpdate({ courseId: courseId }, courseData);
}

const teacherAttendance = async (teacherId, courseId, dateAndTime) => {
  // add attendance in course
  const courseData = await courseDetails(courseId);
  courseData['classesTaken'].push(courseId);
  Course.findOneAndUpdate({ courseId: courseId }, courseData);
}

module.exports = { teacherDetails, studentDetails, courseDetails, addCourse, addStudentInCourse, addStudent, addTeacher, changeStudentPassword, changeTeacherPassword };