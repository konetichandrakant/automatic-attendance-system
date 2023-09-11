import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ErrorPage from '../ErrorPage';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import "bootstrap/dist/css/bootstrap.min.css";

function StudentClassPage() {
  const { courseId } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  // This page details should contain-
  // image of teacher and teacher ID (Link format)

  useEffect(() => {
    axios.get(`http://localhost:3500/student/${courseId}`,
      {
        headers: { Authorization: localStorage.getItem('token') }
      }
    ).then((response) => {
      let data = response.data;
      if (data['studentId'] === null) {
        navigate('/login');
      } else {
        setDetails(data);
      }
    })
  }, [])

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
                        Teacher ID:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['teacherId']}</p>
                  </div>
                </div>

                <div class='p-1 bd-highlight d-flex justify-content-center'>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted" style={{ margin: '0px', border: '0px', padding: '2px' }}>
                      <b>
                        Teacher Name:
                      </b>
                    </h6>
                  </div>
                  <div>
                    <p class="card-text" style={{ margin: '0px', border: '0px', padding: '0px' }}>&nbsp;{details['teacherName']}</p>
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

export default StudentClassPage