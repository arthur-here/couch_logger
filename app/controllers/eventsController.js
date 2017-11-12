const eventsController = (eventsRepository, usersRepository) => {
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

    const createEvent = (event) => {
      return checkUserIDCorrectness(event)
        .then(setupLogLevel)
        .then(eventsRepository.createEvent);
    };

    const event = req.body;

    try {
      const result = await createEvent(event);
      res.send(result);
    } catch (e) {
      res.send({ 'error': e });
    }

    return next();
  };

  const get = async (req, res, next) => {
    const allEvents = async () => {
      return eventsRepository.allEvents();
    };

    const eventsByUser = (userID) => {
      return eventsRepository.eventsByUser(userID);
    };

    const getUserID = (req) => {
      return new Promise((resolve, reject) => {
        if (req.query.userID) {
          resolve(req.query.userID);
        } else {
          resolve(null);
        }
      });
    };

    const getEvents = () => {
      return getUserID(req)
        .then((userID) => {
          if (userID) {
            return eventsByUser(userID);
          } else {
            return allEvents();
          }
        });
    };
    try {
      const result = await getEvents();
      res.send(result);
    } catch (e) {
      res.send({ 'error': e });
    }

    return next();
  };

  return { post, get };
};

export default eventsController;
