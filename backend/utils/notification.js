let notifications = [];

function addNotification(message) {
  console.log("🔥 Notification added:", message);

  notifications.push({
    id: Date.now(),
    message
  });
}

function getNotifications() {
  return notifications;
}

module.exports = { addNotification, getNotifications };