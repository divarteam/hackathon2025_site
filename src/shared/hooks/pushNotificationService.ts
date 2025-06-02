export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    return true;
  } else {
    console.log('Unable to get permission.');
    return false;
  }
};

export const subscribeUserToPush = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers aren\'t supported in this browser.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    // applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  });

  return subscription;
};