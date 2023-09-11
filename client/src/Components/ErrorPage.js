import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../views/Common.css';

function ErrorPage(props) {
  const navigate = useNavigate();

  return (
    <div class='d-flex flex-column bd-highlight justify-content-center' style={{ width: '100vw', height: '100vh' }}>
      <div class='d-flex bd-highlight justify-content-center' style={{ color: 'red' }}>
        ** Invalid Link or you are not authorized to open it **
      </div>
      {
        props.userType !== undefined && props.userType !== null && (
          <div class='d-flex bd-highlight justify-content-center'>
            <a onClick={() => { navigate(`/${props.userType}`) }} style={{ color: 'blue' }} className='hover'>Click Here</a>&nbsp;for home page
          </div>
        )
      }
      <div class='d-flex bd-highlight justify-content-center'>
        <a onClick={() => { navigate(`/`) }} style={{ color: 'blue' }} className='hover'>Click Here</a>&nbsp;for login
      </div>
    </div>
  )
}

export default ErrorPage