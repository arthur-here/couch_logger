let events = [];

const post = (req, res, next) => {
  const event = req.body;
  events.push(event);
  res.send({ 'result': 'success' });
  return next();
};

const get = (req, res, next) => {
  res.send(events);
  return next();
};

export default { get, post };
