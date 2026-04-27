const { notifications } = require("../data/store");

// Get Notifications
exports.getNotifications = (req, res) => {
  res.send(notifications);
};

// Delete Notification
exports.deleteNotification = (req, res) => {
  const index = req.params.index;
  notifications.splice(index, 1);

  res.send("Notification deleted");
};