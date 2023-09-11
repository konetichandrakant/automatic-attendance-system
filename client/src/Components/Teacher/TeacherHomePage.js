import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../views/Common.css'
import ErrorPage from '../ErrorPage';

function TeacherHomePage() {
  const [details, setDetails] = useState(null);
  const [addCourse, setAddCourse] = useState(false);
  const [courseDetails, setCourseDetails] = useState({ courseName: "", courseId: "" });
  const intialDetails = { courseId: '', courseName: '', year: '', semester: '' }
  const navigate = useNavigate();

  // This page details should contain-
  // image of teacher and teacher ID (Link format)

  useEffect(() => {
    axios.get('http://localhost:3500/teacher',
      {
        headers: { Authorization: localStorage.getItem('token') }
      }
    ).then((response) => {
      let data = response.data;
      if (data['teacherId'] === null) {
        navigate('/login');
      } else {
        setDetails(data);
      }
    })
  }, [])

  const saveDetails = () => {
    axios.post('/teacher/addcourse', courseDetails,
      {
        headers: { Authorization: localStorage.getItem('token') }
      }).then(
        (resp) => {
          setDetails(resp.data);
          setAddCourse(false);
          setCourseDetails({ ...intialDetails });
        }
      ).catch(
        (err) => {
          console.log(err)
        })
  }

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
          <div class='d-flex flex-column bd-highlight justify-content-center'>
            {
              !addCourse && (
                <div class='d-flex flex-row bd-highlight justify-content-center'>
                  <button type='button' class='btn btn-success' style={{ width: '150px' }} onClick={() => { setAddCourse(true) }}>Add Course</button>
                </div>
              )
            }
            {
              addCourse && (
                <div class='d-flex flex-column bd-highlight justify-content-center'>
                  <span class='d-flex flex-column bd-highlight justify-content-center'>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <h6>Course ID:</h6>
                    </span>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <input type='text' className='input-box' onChange={(e) => { setCourseDetails({ ...courseDetails, courseId: e.target.value }) }} value={courseDetails.courseId} />
                    </span>
                  </span>
                  <span class='d-flex flex-column bd-highlight justify-content-center'>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <h6>Course Name:</h6>
                    </span>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <input type='text' className='input-box' onChange={(e) => { setCourseDetails({ ...courseDetails, courseName: e.target.value }) }} value={courseDetails.courseName} />
                    </span>
                  </span>
                  <span class='d-flex flex-column bd-highlight justify-content-center'>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <h6>Year:</h6>
                    </span>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <input type='text' className='input-box' onChange={(e) => { setCourseDetails({ ...courseDetails, year: e.target.value }) }} value={courseDetails.year} />
                    </span>
                  </span>
                  <span class='d-flex flex-column bd-highlight justify-content-center'>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <h6>Semester:</h6>
                    </span>
                    <span class='d-flex flex-row bd-highlight justify-content-center'>
                      <input type='text' className='input-box' onChange={(e) => { setCourseDetails({ ...courseDetails, semester: e.target.value }) }} value={courseDetails.semester} />
                    </span>
                  </span>
                  <span class='d-flex flex-row bd-highlight justify-content-center' style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '4px' }}>
                      <button class='btn btn-danger' onClick={() => { setAddCourse(false); setCourseDetails({ courseName: "", courseId: "" }); }}>Cancel</button>
                    </span>
                    <span style={{ marginLeft: '4px' }}>
                      <button class='btn btn-success' onClick={() => { saveDetails() }}>Add Course</button>
                    </span>
                  </span>
                </div>
              )
            }
            {/* Here i consider classname classId and no of classes taken*/}
            <div class='card d-flex flex-column bd-highlight justify-content-center' style={{ margin: '10px' }}>
              {
                details.courses.map((x, i) => {
                  return (
                    <div class='d-flex flex-row bd-highlight justify-content-center hover-effect' onClick={() => { navigate(`/teacher/${details.courses[i]}`) }}>
                      <div>
                        <b style={{ color: 'blue' }}>Course ID:</b>
                      </div>
                      <div>
                        &nbsp;
                        <b>{details.courses[i]}</b>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div class='d-flex flex-row bd-highlight justify-content-center'>
              <text style={{ color: 'red' }}>
                ** click for above classes for more details **
              </text>
            </div>
          </div>
        )
      }
    </>
  )
}

export default TeacherHomePage