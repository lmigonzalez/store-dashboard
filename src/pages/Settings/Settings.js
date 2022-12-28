import React, { useState, useEffect } from 'react';
import settingsStyles from './Settings.module.css';
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
const Settings = () => {
  const [activeTab, setActiveTab] = useState(3);
  const [radioSelected, setRadioSelected] = useState('yes');
  const [admin, setAdmin] = useState(false);
  const [newUser, setNewUser] = useState(false);
  // let admin = true
  const users = [
    {
      name: 'Luis',
      email: 'luis@gmail.com',
      admin: true,
    },
    {
      name: 'Ronald',
      email: 'ronald@gmail.com',
      admin: false,
    },
    {
      name: 'Micky',
      email: 'micky@gmail.com',
      admin: false,
    },
    {
      name: 'Julian',
      email: 'julian@gmail.com',
      admin: false,
    },
    {
      name: 'Mat',
      email: 'mat@gmail.com',
      admin: true,
    },
    {
      name: 'Frank',
      email: 'frank@gmail.com',
      admin: false,
    },
  ];

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

  const submitChanges = (e) => {
    e.preventDefault();
  };

  const handleRadio = (e) => {
    setRadioSelected(e.target.value);
  };

  return (
    <section className={settingsStyles.container}>
      <div className={settingsStyles.header}></div>
      {admin && (
        <>
          <div className={settingsStyles.tabs}>
            <button
              onClick={() => setActiveTab(1)}
              className={activeTab === 1 && settingsStyles.active}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={activeTab === 2 && settingsStyles.active}
            >
              New User
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={activeTab === 3 && settingsStyles.active}
            >
              All Users
            </button>
          </div>
          <div className={settingsStyles.body}>
            {activeTab === 1 && (
              <form onSubmit={submitChanges}>
                <p>Question: Which country was the first one you visited?</p>
                <input type="text" placeholder="Answer" />
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Repeat New Password" />
                <button type="submit">Change Password</button>
                <button onClick={cancelSubmit}>Cancel</button>
              </form>
            )}
            {activeTab === 2 && (
              <form onSubmit={submitChanges}>
                <p>Question: Which country was the first one you visited?</p>
                <input type="text" placeholder="User Name" />
                <input type="email" placeholder="User Email" />
                <div className={settingsStyles.radios}>
                  <p>Admin?</p>
                  <label for="yes">Yes</label>
                  <input
                    type="radio"
                    id="yes"
                    name="admin"
                    value="yes"
                    checked={radioSelected === 'yes'}
                    onChange={handleRadio}
                  />
                  <label for="no">No</label>
                  <input
                    type="radio"
                    id="no"
                    name="admin"
                    value="no"
                    checked={radioSelected === 'no'}
                    onChange={handleRadio}
                  />
                </div>

                <button type="submit">Change Password</button>
                <button onClick={cancelSubmit}>Cancel</button>
              </form>
            )}
            {activeTab === 3 && (
              <di className={settingsStyles.users}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Is Admin?</th>
                      <th>Confirm</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      return (
                        <tr>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <div className={settingsStyles.radios}>
                              <p>Admin?</p>
                              <label for="yes">Yes</label>
                              <input
                                type="radio"
                                id="yes"
                                name={i}
                                value={true}
                                defaultChecked={u.admin === true}
                                onChange={handleRadio}
                              />
                              <label for="no">No</label>
                              <input
                                type="radio"
                                id="no"
                                name={i}
                                value={false}
                                defaultChecked={u.admin === false}
                                onChange={handleRadio}
                              />
                            </div>
                          </td>
                          <td>
                            {' '}
                            <button>
                              {' '}
                              <AiOutlineCheck />{' '}
                            </button>
                            <button>
                              {' '}
                              <AiOutlineClose />{' '}
                            </button>
                          </td>
                          <td>
                            {' '}
                            <button className={settingsStyles.delete_btn}>
                              {' '}
                              <AiFillDelete />{' '}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </di>
            )}
          </div>
        </>
      )}

      {!admin && (
        <div className={settingsStyles.body}>
          <h2>Change Password</h2>

          <form onSubmit={submitChanges}>
            {newUser ? (
              <select>
                {selectOptions.map((i) => {
                  return <option>{i}</option>;
                })}
              </select>
            ) : (
              <p>Question: Which country was the first one you visited?</p>
            )}
            <input type="text" placeholder="Security Question" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Repeat New Password" />
            <button type="submit">Change Password</button>
            <button onClick={cancelSubmit}>Cancel</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Settings;
