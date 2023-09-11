import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../views/Register.css';
import { validatePassword, validateUsername, validateName } from '../Validations/validate'

function Register() {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(null);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(null);
  const [name, setName] = useState('');
  const [validName, setValidName] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (isValid === true)
      navigate("/login");
  }, [isValid])

  useEffect(() => { setValidUsername(validateUsername(username) !== null); }, [username])
  useEffect(() => { setValidPassword(validatePassword(password) !== null); setValidConfirmPassword(password === confirmPassword) }, [password, confirmPassword])
  useEffect(() => { setValidName(validateName(name) !== null) }, [name])

  const validDetails = () => {
    let validateDetails =
      (validName === true
        && validUsername === true
        && validPassword === true
        && validConfirmPassword === true);
    if (!validateDetails)
      return setIsValid(false);
    axios.post('http://localhost:3500/register',
      {
        username: username
        , password: password
        , name: name
        , registerType: isTeacher
      })
      .then((response) => {
        setIsValid(response.data.valid);
      })
      .catch(() => {
        setIsValid('server error')
      });
    setIsValid(true);
  }

  return (
    <div className='register-box'>
      <div className='input-field'>
        <div className='label'>
          USERID
        </div>
        <div>
          <input className='input-box' type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder='enter your user id' />
        </div>
        {
          validUsername !== null && validUsername === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid username **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          PASSWORD
        </div>
        <div>
          <input className='input-box' type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password} placeholder='enter your password' />
        </div>
        {
          validPassword !== null && validPassword === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid password **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          CONFIRM PASSWORD
        </div>
        <div>
          <input className='input-box' type="password"
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            value={confirmPassword} placeholder='confirm your password' />
        </div>
        {
          validConfirmPassword !== null && validConfirmPassword === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** password doesn't match **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          NAME
        </div>
        <div>
          <input className='input-box' type="text"
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name} placeholder='enter your name' />
        </div>
        {
          validName !== null && validName === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid name **
              </text>
            </div>
          )
        }
      </div>

      <br />

      <div className='input-field radio-buttons'>
        <span><input type="checkbox"
          onChange={() => {
            setIsTeacher((v) => !v)
          }}
          checked={isTeacher} /></span>
        <span> Teacher</span>
      </div>

      <div className='button-div'>
        <button className='cursor-pointer login-button' onClick={validDetails} type='button'>
          {
            <span>
              {isTeacher ? 'REGISTER AS TEACHER' : 'REGISTER AS STUDENT'}
            </span>
          }
        </button>
      </div>

      {
        isValid !== "valid" && isValid !== false && (
          <text style={{ color: 'red' }}>
            <br />
            {isValid}
          </text>
        )
      }
    </div>
  )
}

export default Register