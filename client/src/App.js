import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentHomePage from './Components/Student/StudentHomePage'
import StudentClassPage from './Components/Student/StudentClassPage'
import TeacherHomePage from './Components/Teacher/TeacherHomePage'
import TeacherClassPage from './Components/Teacher/TeacherClassPage'
import TeacherStudentAttendancePage from './Components/Teacher/TeacherStudentAttendancePage'
import Login from './Components/Login';
import PageDoesNotExsist from './Components/PageDoesNotExsist'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          {/* <Route exact path='/register' element={<Register />} /> */}
          <Route exact path='/student' element={<StudentHomePage />} />
          <Route exact path='/student/:courseId' element={<StudentClassPage />} />
          <Route exact path='/teacher' element={<TeacherHomePage />} />
          <Route exact path='/teacher/:courseId' element={<TeacherClassPage />} />
          <Route exact path='/teacher/:courseId/:studentId' element={<TeacherStudentAttendancePage />} />
          <Route path='*' element={<PageDoesNotExsist />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App