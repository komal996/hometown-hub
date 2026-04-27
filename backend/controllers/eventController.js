const { events, notifications } = require("../data/store");

// Create Event
exports.createEvent = (req, res) => {
  const { title, date } = req.body;

  const event = {
    id: Date.now(),
    title,
    date,
    joined: 0
  };

  events.push(event);

  notifications.push({
    message: `📅 Event "${title}" created`
  });

  res.send(event);
};

// Get Events
exports.getEvents = (req, res) => {
  res.send(events);
};

// Join Event
exports.joinEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (event) {
    event.joined++;
  }

  res.send(event);
};

// Update Event
exports.updateEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (event) {
    event.title = req.body.title;
  }

  res.send("Event updated");
};

// Delete Event
exports.deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id == req.params.id);

  if (index !== -1) {
    events.splice(index, 1);
  }

  res.send("Event deleted");
};