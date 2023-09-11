import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../views/Common.css';
import ErrorPage from '../ErrorPage';

function TeacherClassPage() {
  const { courseId } = useParams();

  const [details, setDetails] = useState(null);
  const [addStudent, setAddStudent] = useState(false);
  const [addStudentId, setAddStudentId] = useState('');

  const navigate = useNavigate();

  const getPercentage = (a, b) => {
    return (100 * a) / b;
  }

  useEffect(() => {
    axios.get(`http://localhost:3500/teacher/${courseId}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        let data = response.data;
        if (data['teacherId'] === null) {
          navigate('/login');
        } else {
          console.log(data);
          setDetails(data);
        }
      });
  }, [])

  const addStud = (studentId) => {
    axios.post('/teacher/addstudent'
      , { studentId: addStudentId, courseId: courseId }
      , { headers: { Authorization: localStorage.getItem('token') } })
      .then((resp) => {
        setDetails(resp.data);
        setAddStudent(false);
      })
  }

  return (
    <>
      {
        details && details.valid === false && (
          <ErrorPage userType={details.type} />
        )
      }

      {
        details && details['valid'] !== false && (
          <div>
            <div class='d-flex flex-column bd-highlight justify-content-center align-items-center'>
              <div class='d-flex flex-row bd-highlight justify-content-center'>
                <span>
                  <b>course ID:</b>
                </span>
                <span>
                  &nbsp;{courseId}
                </span>
              </div>
              <div class='d-flex flex-row bd-highlight justify-content-center'>
                <span>
                  <b>course Name:</b>
                </span>
                <span>
                  &nbsp;{details.courseName}
                </span>
              </div>
              <div class='d-flex flex-row bd-highlight justify-content-center'>
                <span>
                  <b>No.of Classes Taken:</b>
                </span>
                <span>
                  &nbsp;{details.classesTaken.length}
                </span>
              </div>

              {
                !addStudent && (
                  <div class='d-flex flex-column bd-highlight justify-content-center'>
                    <button type="button" class="btn btn-success" style={{ width: '150px' }} onClick={() => { setAddStudent(true) }}>Add Student</button>
                  </div>
                )
              }
            </div>

            {
              addStudent && (
                <div class='d-flex flex-row bd-highlight justify-content-center'>
                  <div class='card' style={{ maxWidth: '400px', padding: '10px' }}>
                    <div class='d-flex flex-column bd-highlight justify-content-center align-items-center'>
                      <span>
                        <b>Student ID:</b>
                      </span>
                      <span>
                        &nbsp;<input onChange={(e) => { setAddStudentId(e.target.value) }} value={addStudentId} className='input-box' />
                      </span>
                    </div>
                    <div class='d-flex flex-row bd-highlight justify-content-center'>
                      <span>
                        <button type="button" class="btn btn-danger" style={{ width: '150px', margin: '5px' }} onClick={() => { setAddStudent(false) }}>Cancel</button>
                      </span>
                      <span>
                        <button type="button" class="btn btn-success" style={{ width: '150px', margin: '5px' }} onClick={() => { setAddStudent(true); addStud() }}>Add Student</button>
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            <table class="table table-striped table-hover">
              <thead class='flex-row'>
                <tr>
                  <th scope="col">SL no.</th>
                  <th scope="col">Roll Number</th>
                  <th scope="col">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {
                  details.students.map((x, i) => {
                    return (
                      <tr onClick={() => {
                        navigate(`/teacher/${courseId}/${details.students[i].studentId}`)
                      }} className='hover-effect-cursor'>
                        <th scope='row'>{i + 1}</th>
                        <td>{details.students[i].studentId}</td>
                        <td>{`${getPercentage(details.students[i].noOfClassesAttended, details.classesTaken.length)}`}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )
      }

      {
        !details && (
          <Loading />
        )
      }

    </>
  )
}

export default TeacherClassPage