import eventViewModel from '../models/eventViewModel';

const eventsController = (eventsRepository, usersRepository) => {
  /**
   * Save a new event.
   * 1. Checks if user with a provided `userID` exists. If no, clears the `userID` field.
   * 2. Checks if there is any `logLevel` value. If no, sets the log level to default `info`.
   * 3. Sets the current date timestamp as a time.
   */
  const post = async (req, res, next) => {
    const checkUserIDCorrectness = (event) => {
      return usersRepository
        .getUser(event.userID)
        .then((user) => {
          if (!user) {
            delete event.userID;
          }

          return event;
        });
    };

    const setupLogLevel = (event) => {
      if (!event.logLevel) {
        event.logLevel = 'info';
      }

      return event;
    };

    const setTime = (event) => {
      event.time = Date.now();
      return event;
    };

    const createEvent = (event) => {
      return checkUserIDCorrectness(event)
        .then(setupLogLevel)
        .then(setTime)
        .then(eventsRepository.createEvent);
    };

    const event = req.body;

    try {
      const result = await createEvent(event);
      res.send(result);
    } catch (e) {
      res.send({ 'error': e });
    };
  };

  /**
   * Returns all events or events by User, if `userID` parameter is provided in the query.
   */
  const get = async (req, res, next) => {
    const allEvents = async () => {
      return eventsRepository.allEvents();
    };

    const eventsByUser = (userID) => {
      return eventsRepository.eventsByUser(userID);
    };

    const parseUserIDFromRequest = (req) => {
      return new Promise((resolve, reject) => {
        if (req.query.userID) {
          resolve(req.query.userID);
        } else {
          resolve(null);
        }
      });
    };

    const sortEvents = (events) => {
      return events.sort((lhs, rhs) => {
        return rhs.time - lhs.time;
      });
    };

    const mapToViewModels = (events) => {
      return events.map(eventViewModel);
    };

    const getEvents = () => {
      return parseUserIDFromRequest(req)
        .then((userID) => {
          if (userID) {
            return eventsByUser(userID);
          } else {
            return allEvents();
          }
        })
        .then(sortEvents)
        .then(mapToViewModels);
    };

    try {
      const result = await getEvents();
      res.render('pages/events', { events: result });
    } catch (e) {
      res.send({ 'error': e });
    };
  };

  /**
   *  Returns event properties by the `eventID`.
   */
  const getByID = async (req, res, next) => {
    const getEventID = new Promise((resolve, reject) => {
      if (!req.params.eventID) {
        reject(Error('Event ID is missing'));
      } else {
        resolve(req.params.eventID);
      };
    });

    const getEventByID = (eventID) => {
      return eventsRepository.eventByID(eventID);
    };

    const mapEventToProps = (event) => {
      const eventProperties = {
        'id': event._id,
        'timestamp': event.time,
        'user.id': event.userID,
        'message': event.message,
        'platform': event.platform,
        'client.version': event.clientVersion,
        'custom': event.custom
      };

      const props = Object.entries(eventProperties).map(([key, value]) => {
        return {
          name: key,
          value: value
        };
      });

      return props;
    };

    try {
      const result = await getEventID
        .then(getEventByID)
        .then(mapEventToProps);

      res.render('pages/event', { properties: result });
    } catch (e) {
      res.send({ 'error': e });
    };
  };

  return { post, get, getByID };
};

export default eventsController;
