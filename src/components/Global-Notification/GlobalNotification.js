import React from 'react';

import notifications from './GlobalNotification.module.css';

import { useSelector } from 'react-redux';

import { messageInformation } from '../../features/notification/notification.Slice';

import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';


const GlobalNotification = () => {

	let message = useSelector(messageInformation)


  return (
    <div
      className={
        message.messageIsPositive
          ? [notifications.global_notification, notifications.positive].join(
              ' '
            )
          : [notifications.global_notification, notifications.negative].join(
              ' '
            )
      }
    >
      {' '}
      <div className={notifications.notification_icon}>
        {message.messageIsPositive ? (
          <AiFillCheckCircle color="#4ecca3" />
        ) : (
          <AiFillExclamationCircle color="#b04a4a" />
        )}
      </div>
      <p>{message.message}</p>{' '}
    </div>
  );
};

export default GlobalNotification;
