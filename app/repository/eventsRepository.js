import Promise from 'bluebird';

const eventsRepository = (db) => {
  const addEvent = (event) => {
    event.type = 'event';
    return Promise.promisify(db.insert)(event);
  };

  const allEvents = () => {
    return Promise.promisify(db.view)('logger', 'all-events')
      .then((eventsData) => {
        return eventsData.rows.map((eventRow) => {
          return eventRow.key;
        });
      });
  };

  return {
    addEvent: addEvent,
    allEvents: allEvents
  };
};

export default eventsRepository;
