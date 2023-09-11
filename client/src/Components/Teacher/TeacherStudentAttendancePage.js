import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from '../ErrorPage';

function TeacherStudentAttendancePage() {
  const { courseId, studentId } = useParams();

  let j = 0;
  const [details, setDetails] = useState(null);

  const navigate = useNavigate();

  const getPercentage = (a, b) => {
    return (100 * a) / b;
  }

  useEffect(() => {
    axios.get(`http://localhost:3500/teacher/${courseId}/${studentId}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        let data = response.data;
        if (data['teacherId'] === null) {
          navigate('/login');
        } else {
          setDetails(data);
        }
      });
  }, [])

  useEffect(() => { }, [])

  return (
    <>
      {
        details === null && (
          <Loading />
        )
      }

      {
        details && details.valid === false && (
          <ErrorPage userType={details.type} />
        )
      }

      {
        details && details['valid'] !== false && (
          <>
            <div class='card d-flex flex-column bd-highlight justify-content-center'>
              <div class='p-2 bd-highlight d-flex flex-column justify-content-center'>
                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <h3 class='card-title'>
                    Course Details
                  </h3>
                </div>

                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted" style={{ margin: '0px', border: '0px', padding: '2px' }}>
                      <b>
                        Course ID:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['courseId']}</p>
                  </div>
                </div>

                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted" style={{ margin: '0px', border: '0px', padding: '2px' }}>
                      <b>
                        Course Name:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['courseName']}</p>
                  </div>
                </div>

                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted" style={{ margin: '0px', border: '0px', padding: '2px' }}>
                      <b>
                        Student ID:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['studentId']}</p>
                  </div>
                </div>

                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted" style={{ margin: '0px', border: '0px', padding: '2px' }}>
                      <b>
                        Student Name:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['studentName']}</p>
                  </div>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Attendance Time</th>
                </tr>
              </thead>
              <tbody>
                {
                  details['teacherAttendance'].map((x, i) => {
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{details['teacherAttendance'][i]}</td>
                      <td>{details['teacherAttendance'][i]}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </>
        )
      }

    </>
  )
}

export default TeacherStudentAttendancePage