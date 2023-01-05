import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount } from '../../features/auth/authSlice';
import { userInformation } from '../../features/auth/authSlice';
import { populateMessage } from '../../features/notification/notification.Slice';
import settingsStyles from './Settings.module.css';
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

import DeleteUser from './DeleteUser';
import UserStatus from './UserStatus';

const Settings = () => {
  const dispatch = useDispatch();
  const initialUserInformation = {
    securityQuestion: 'What was your childhood nickname?',
    securityAnswer: '',
    password: '',
    repeatPassword: '',
  };

  const initialNewUser = {
    name: '',
    email: '',
    isAdmin: false,
  };

  // const initialUserStatusData = {
  //   id: '',
  //   isAdmin: false,
  // };

  const [activeTab, setActiveTab] = useState(1);
  const [radioSelected, setRadioSelected] = useState('yes');
  const [admin, setAdmin] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState(initialUserInformation);
  const [createdUser, setCreatedUser] = useState(initialNewUser);
  const [allUsers, setAllUsers] = useState([]);
  const userInf = useSelector(userInformation);

  const [deleteUser, setDeleteUser] = useState(false);
  const [changeUser, setChangeUser] = useState(false);

  const [userToDelete, setUserToDelete] = useState({});
  const [userToChange, setUserToChange] = useState({});
  const [userStatusValue, setUserStatusValue] = useState();

  useEffect(() => {
    getUserInformation();
  }, [newUser]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get('http://localhost:3032/api/get-all-users')
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteCancel = () => {
    setDeleteUser(false);
  };

  const onChangeCancel = () => {
    setChangeUser(false);
    getAllUsers();
  };

  const getUserInformation = () => {
    setAdmin(userInf.isAdmin);

    if (userInf.securityQuestion.length === 0) {
      setNewUser(true);
    } else {
      setNewUser(false);
    }
  };

  const accountChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const newUserChange = (e) => {
    setCreatedUser({
      ...createdUser,
      [e.target.name]: e.target.value,
    });
  };

  let selectOptions = [
    'What was your childhood nickname?',
    'In what city did you meet your spouse/significant other?',
    'What is the name of your favorite childhood friend?',
    'What street did you live on in third grade?',
    'What is your oldest sibling’s birthday month and year?',
    'What is the middle name of your youngest child?',
    "What is your oldest sibling's middle name?",
    'What school did you attend for sixth grade?',
    'What was your childhood phone number including area code?',
    "What is your oldest cousin's first and last name?",
    'What was the name of your first stuffed animal?',
  ];

  const cancelSubmit = () => {};

  const submitAccountChanges = (e) => {
    e.preventDefault();
    if (newUserData.password === newUserData.repeatPassword) {
      axios
        .patch('http://localhost:3032/api/update-user-account', {
          newUserData,
          id: userInf.id,
        })
        .then(({ data }) => {
          dispatch(updateAccount(data));
          dispatch(
            populateMessage({
              message: 'Password updated successfully',
              messageStatus: true,
              showNotification: true,
            })
          );
          setNewUserData(initialUserInformation);
          setNewUser(false);
        })
        .catch(() => {
          dispatch(
            populateMessage({
              message: "The password wasn't updated successfully",
              messageStatus: false,
              showNotification: true,
            })
          );
          setNewUserData(initialUserInformation);
        });
    } else {
      console.log('Make sure password match');
    }
  };

  const submitCreatedUser = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3032/api/new-user', createdUser)
      .then(() => {
        dispatch(
          populateMessage({
            message: 'User crated successfully',
            messageStatus: true,
            showNotification: true,
          })
        );
        setCreatedUser(initialNewUser);
        getAllUsers();
      })
      .catch(() => {
        dispatch(
          populateMessage({
            message: "The user wasn't created successfully",
            messageStatus: false,
            showNotification: true,
          })
        );
      });
  };

  const handleRadio = (e) => {
    let value;
    if (e.target.value === 'true') {
      value = true;
    } else if (e.target.value === 'false') {
      value = false;
    }
    setRadioSelected(e.target.value);
    setCreatedUser({
      ...createdUser,
      isAdmin: value,
    });
  };

  const handleDelete = (user) => {
    let id = user._id;
    setUserToDelete(user);
    setDeleteUser(true);
  };

  const handleStatusChange = (user, index) => (e) => {
    let value;
    if (e.target.value === 'true') {
      setUserStatusValue(true);
      value = true;
    } else if (e.target.value === 'false') {
      setUserStatusValue(false);
      value = false;
    }
    let users = [...allUsers];
    users[index].isAdmin = value;
    setAllUsers(users);
    setChangeUser(true);
    setUserToChange(user);
  };

  return (
    <section className={settingsStyles.container}>
      <div className={settingsStyles.header}></div>
      {admin && (
        <>
          <div className={settingsStyles.tabs}>
            <button
              onClick={() => (
                setActiveTab(1), setDeleteUser(false), setChangeUser(false)
              )}
              className={activeTab === 1 ? settingsStyles.active : ''}
            >
              {newUser ? 'Setup Account' : 'Change Password'}
            </button>
            <button
              onClick={() => (
                setActiveTab(2), setDeleteUser(false), setChangeUser(false)
              )}
              className={activeTab === 2 ? settingsStyles.active : ''}
            >
              New User
            </button>
            <button
              onClick={() => (setActiveTab(3), getAllUsers())}
              className={activeTab === 3 ? settingsStyles.active : ''}
            >
              All Users
            </button>
          </div>
          <div className={settingsStyles.body}>
            {activeTab === 1 && (
              <form onSubmit={submitAccountChanges} autoComplete="off">
                {newUser ? (
                  <select
                    name="securityQuestion"
                    value={newUserData.securityQuestion}
                    onChange={accountChange}
                  >
                    {selectOptions.map((i, index) => {
                      return <option key={index}>{i}</option>;
                    })}
                  </select>
                ) : (
                  <p>Question: {userInf.securityQuestion}</p>
                )}

                <input
                  type="text"
                  placeholder="Answer"
                  name="securityAnswer"
                  value={newUserData.securityAnswer}
                  onChange={accountChange}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={newUserData.password}
                  onChange={accountChange}
                />
                <input
                  type="password"
                  placeholder="Repeat New Password"
                  name="repeatPassword"
                  value={newUserData.repeatPassword}
                  onChange={accountChange}
                />
                <button type="submit">Change Password</button>
                <button onClick={cancelSubmit}>Cancel</button>
              </form>
            )}
            {activeTab === 2 && (
              <form onSubmit={submitCreatedUser} autoComplete="off">
                <input
                  type="text"
                  placeholder="User Name"
                  name="name"
                  value={createdUser.name}
                  onChange={newUserChange}
                />
                <input
                  type="email"
                  placeholder="User Email"
                  name="email"
                  value={createdUser.email}
                  onChange={newUserChange}
                />
                <div className={settingsStyles.radios}>
                  <p>Admin?</p>
                  <label>Yes</label>
                  <input
                    type="radio"
                    id="yes"
                    name="admin"
                    value={true}
                    onClick={handleRadio}
                  />
                  <label>No</label>
                  <input
                    type="radio"
                    id="no"
                    name="admin"
                    value={false}
                    defaultChecked
                    onClick={handleRadio}
                  />
                </div>

                <button type="submit">Add New User</button>
                <button onClick={cancelSubmit}>Cancel</button>
              </form>
            )}
            {activeTab === 3 && (
              <div className={settingsStyles.users}>
                {deleteUser && !changeUser && (
                  <DeleteUser
                    onDeleteCancel={onDeleteCancel}
                    userToDelete={userToDelete}
                    getAllUsers={getAllUsers}
                    setDeleteUser={setDeleteUser}
                  />
                )}
                {changeUser && !deleteUser && (
                  <UserStatus
                    userToChange={userToChange}
                    onChangeCancel={onChangeCancel}
                    userStatusValue={userStatusValue}
                    getAllUsers={getAllUsers}
                    setChangeUser={setChangeUser}
                  />
                )}
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Is Admin?</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u, i) => {
                      return (
                        <tr key={i}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <div className={settingsStyles.radios}>
                              {/* <p>Admin?</p> */}
                              <label>Yes</label>
                              <input
                                type="radio"
                                name={i}
                                value={true}
                                checked={u.isAdmin === true}
                                onChange={handleStatusChange(u, i)}
                              />
                              <label>No</label>
                              <input
                                type="radio"
                                name={i}
                                value={false}
                                checked={u.isAdmin === false}
                                onChange={handleStatusChange(u, i)}
                              />
                            </div>
                          </td>
                          <td>
                            {' '}
                            <button
                              className={settingsStyles.delete_btn}
                              onClick={() => handleDelete(u)}
                            >
                              {' '}
                              <AiFillDelete />{' '}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {!admin && (
        <div className={settingsStyles.body}>
          <h2>Change Password</h2>

          <form onSubmit={submitAccountChanges} autoComplete="off">
            {newUser ? (
              <select
                name="securityQuestion"
                value={newUserData.securityQuestion}
                onChange={accountChange}
              >
                {selectOptions.map((i, index) => {
                  return <option key={index}>{i}</option>;
                })}
              </select>
            ) : (
              <p>Question: {userInf.securityQuestion}</p>
            )}

            <input
              type="text"
              placeholder="Answer"
              name="securityAnswer"
              value={newUserData.securityAnswer}
              onChange={accountChange}
            />
            <input
              type="password"
              placeholder="New Password"
              name="password"
              value={newUserData.password}
              onChange={accountChange}
            />
            <input
              type="password"
              placeholder="Repeat New Password"
              name="repeatPassword"
              value={newUserData.repeatPassword}
              onChange={accountChange}
            />
            <button type="submit">Change Password</button>
            <button onClick={cancelSubmit}>Cancel</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Settings;
