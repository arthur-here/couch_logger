let names = [];

const post = (req, res, next) => {
  const name = req.body.name;
  console.log(req + ' received');
  names.push(name);
  res.send({
    'result': 'success'
  });
  return next();
};

const get = (req, res, next) => {
  res.send(`Hello, ${names}`);
  return next();
};

export default { get, post };
