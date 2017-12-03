import userViewModel from '../models/userViewModel';

const usersController = (usersRepository) => {
  const post = async (req, res, next) => {
    const user = req.body;
    try {
      const result = await usersRepository.createUser(user);
      res.send(result);
    } catch (e) {
      res.send({ 'error': e });
    }

    return next();
  };

  const getByID = async (req, res, next) => {
    if (!req.params.userID) {
      res.send({ error: 'User ID is missing' });
      return next();
    }

    try {
      const user = await usersRepository.getUser(req.params.userID);
      res.send(user);
    } catch (e) {
      res.send({ error: e });
    }

    return next();
  };

  const get = async (req, res) => {
    try {
      const users = await usersRepository.allUsers().map(userViewModel);
      res.render('pages/users', { users: users });
    } catch (e) {
      res.send({ error: e });
    }
  };

  return { post, get, getByID };
};

export default usersController;
