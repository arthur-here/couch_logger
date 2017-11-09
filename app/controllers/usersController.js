const usersController = (eventsRepository) => {
  const post = (req, res, next) => {
    // const event = req.body;
    // events.push(event);
    // res.send({ 'result': 'success' });
    return next();
  };

  const get = (req, res, next) => {
    // res.send(events);
    return next();
  };

  return { post, get };
};

export default usersController;
