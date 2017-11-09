let events = [];

const eventsController = (eventsRepository) => {
  const post = async (req, res, next) => {
    const event = req.body;
    try {
      const result = await eventsRepository.addEvent(event);
      res.send(result);
    } catch (e) {
      res.send({ 'error': e });
    }

    return next();
  };

  const get = async (req, res, next) => {
    try {
      const events = await eventsRepository.allEvents();
      res.send(events);
    } catch (e) {
      res.send({ 'error': e });
    }

    return next();
  };

  return { post, get };
};

export default eventsController;
