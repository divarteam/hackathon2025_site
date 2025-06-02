self.addEventListener('push', (event) => {
  const data = event.data?.json();
  if (data) {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/favicon.ico',
    });
  }
});