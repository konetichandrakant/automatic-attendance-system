const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  courseId: { type: String, index: true },
  courseName: { type: String, default: '' },
  year: { type: Number, default: '' },
  semester: { type: Number, default: '' },
  teacherId: { type: String, default: '' },
  teacherName: { type: String, default: '' },
  classesTaken: [{ type: String }],
  students: [
    {
      studentId: { type: String },
      classesAttended: [{ type: String }]
    }
  ]
})

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };