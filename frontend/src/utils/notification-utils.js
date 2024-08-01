// src/utils/notificationUtils.js
export const requestNotificationPermission = () => {
  console.log('Checking notification permission...');
  if (Notification.permission === 'default') {
    console.log('Requesting notification permission...');
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  } else {
    console.log('Notification permission already granted or denied. Current permission:', Notification.permission);
  }
};

export const sendNotification = (title, options) => {
  console.log('Attempting to send notification...');
  if (Notification.permission === 'granted') {
    console.log('Permission granted. Sending notification...');
    new Notification(title, options);
    console.log('Notification sent:', title, options);
  } else {
    console.log('Notification permission is not granted.');
  }
};
