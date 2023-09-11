import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginRegisterPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => { navigate('/login') }}>
          Login
        </button>
      </div>
      <div>
        <button onClick={() => { navigate('/register') }}>
          Register
        </button>
      </div>
    </div>
  )
}

export default LoginRegisterPage