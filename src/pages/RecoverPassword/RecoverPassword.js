import React, { useState } from 'react';
import axios from 'axios';
import recoverPassword from './RecoverPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
const RecoverPassword = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);

  const initialData = {
    email: '',
    question: '',
    answer: '',
    password: '',
    repeatPassword: '',
    recoveryValue: '',
  };

  const [recoveryData, setRecoveryData] = useState(initialData);

  const handleChange = (e) => {
    setRecoveryData({
      ...recoveryData,
      [e.target.name]: e.target.value,
    });
  };

  const emailReady = (e) => {
    e.preventDefault();
    if (recoveryData.email.length < 5) {
      return;
    }
    axios
      .post('http://localhost:3032/api/recover-user-account', {
        email: recoveryData.email,
      })
      .then((res) => {
        if (res.data != null) {
          setRecoveryData((recoveryData) => {
            return {
              ...recoveryData,
              question: res.data.securityQuestion,
            };
          });

          setCurrentTab(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const questionReady = (e) => {
    e.preventDefault();
    if (recoveryData.answer.length < 3) {
      console.log('Pleaser Enter a valid answer');
      return;
    }
    axios
      .post('http://localhost:3032/api/check-if-answer-correct', {
        email: recoveryData.email,
        securityAnswer: recoveryData.answer,
      })
      .then((res) => {
        setRecoveryData((recoveryData) => {
          return {
            ...recoveryData,
            recoveryValue: res.data,
          };
        });

        setCurrentTab(3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmNewPassword = (e) => {
    e.preventDefault();
    if (recoveryData.password !== recoveryData.repeatPassword) {
      console.log('Make sure password Match');
      return;
    }
    if (
      recoveryData.password.length < 5 ||
      recoveryData.repeatPassword.length < 5
    ) {
      console.log('Make sure you enter a valid password');
      return;
    }
    axios
      .post('http://localhost:3032/api/update-password', {
        email: recoveryData.email,
        recoveryValue: recoveryData.recoveryValue,
        password: recoveryData.password,
      })
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={recoverPassword.content}>
      <div className={recoverPassword.container}>
        {' '}
        <div className={recoverPassword.header}>
          <p
            className={[recoverPassword.email, recoverPassword.current].join(
              ' '
            )}
          >
            Account Email
          </p>
          <p
            className={
              currentTab > 1
                ? [recoverPassword.answer, recoverPassword.current].join(' ')
                : recoverPassword.answer
            }
          >
            Security Question
          </p>
          <p
            className={
              currentTab > 2
                ? [recoverPassword.password, recoverPassword.current].join(' ')
                : recoverPassword.password
            }
          >
            New Password
          </p>
        </div>
        {currentTab === 1 && (
          <form onSubmit={emailReady}>
            <label>Account Email</label>
            <input
              type="email"
              name="email"
              value={recoveryData.email}
              onChange={handleChange}
            />
            <button type="submit">Next</button>
            <div className={recoverPassword.back_to_login}>
              <button onClick={()=>{navigate('/login')}}> <AiOutlineArrowLeft/> Back to Login</button>
            </div>
          </form>
        )}
        {currentTab === 2 && (
          <form onSubmit={questionReady}>
            <p>{recoveryData.question}</p>
            <label>Answer Security Question</label>
            <input
              type="text"
              name="answer"
              value={recoveryData.answer}
              onChange={handleChange}
            />
            <button type="submit">Next</button>
          </form>
        )}
        {currentTab === 3 && (
          <form onSubmit={confirmNewPassword}>
            <label>Enter New Password</label>
            <input
              type="password"
              name="password"
              value={recoveryData.password}
              onChange={handleChange}
            />
            <label>Confirm New Password</label>
            <input
              type="password"
              name="repeatPassword"
              value={recoveryData.repeatPassword}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
