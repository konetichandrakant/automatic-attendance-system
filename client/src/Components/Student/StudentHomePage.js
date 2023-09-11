import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from '../ErrorPage';

function StudentHomePage() {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3500/student',
      { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        let data = response.data;
        if (data['studentId'] === null) {
          navigate('/login');
        } else {
          setDetails(data);
          console.log(data);
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
          <div class='d-flex flex-column bd-highlight justify-content-center'>
            <div class='card d-flex flex-column bd-highlight justify-content-center' style={{ margin: '10px' }}>
              {
                details.courses.map((x, i) => {
                  return (
                    <div class='d-flex flex-row bd-highlight justify-content-center hover-effect' onClick={() => { navigate(`/student/${details.courses[i]}`) }}>
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

export default StudentHomePage