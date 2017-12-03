import Promise from 'bluebird';

const eventsRepository = (db) => {
  const createEvent = (event) => {
    event.type = 'event';
    return Promise.promisify(db.insert)(event);
  };

  const allEvents = () => {
    return Promise.promisify(db.view)('logger', 'all-events')
      .then((eventsData) => {
        return eventsData.rows.map((eventRow) => {
          return eventRow.value;
        });
      });
  };

  const eventByID = (eventID) => {
    return Promise.promisify(db.view)('logger', 'all-events', { key: eventID })
      .then((eventsData) => {
        return eventsData.rows
          .map((eventRow) => {
            return eventRow.value;
          })[0];
      });
  };

  const eventsByUser = (userID) => {
    return Promise.promisify(db.view)('logger', 'events-by-user', { key: userID })
      .then((eventsData) => {
        return eventsData.rows.map((eventRow) => {
          return eventRow.value;
        });
      });
  };

  return {
    createEvent: createEvent,
    allEvents: allEvents,
    eventByID: eventByID,
    eventsByUser: eventsByUser
  };
};

export default eventsRepository;
