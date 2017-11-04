let names = [];

const post = (req, res, next) => {
  const name = req.name;
  names.push(name);
  return next();
};

const get = (req, res, next) => {
  res.send(`Hello, names`);
  return next();
};

export { get, post };
