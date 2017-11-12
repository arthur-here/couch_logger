import Promise from 'bluebird';

const usersRepository = (db) => {
  const createUser = (user) => {
    return new Promise((resolve, reject) => {
      if (user.name && user.id) {
        resolve({
          '_id': user.id,
          'name': user.name,
          'type': 'user'
        });
      } else {
        reject(new Error('User miss id or name'));
      }
    }).then((userDocument) => {
      return Promise.promisify(db.insert)(userDocument);
    });
  };

  const getUser = (userID) => {
    return Promise.promisify(db.get)(userID)
      .catch((error) => {
        if (error.statusCode === 404) {
          return null;
        } else {
          throw error;
        }
      });
  };

  const allUsers = () => {
    return Promise.promisify(db.view)('logger', 'all-users')
      .then((eventsData) => {
        return eventsData.rows.map((eventRow) => {
          return eventRow.value;
        });
      });
  };

  return {
    createUser: createUser,
    getUser: getUser,
    allUsers: allUsers
  };
};

export default usersRepository;
