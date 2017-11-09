import Promise from 'bluebird';
import config from '../config/config';

export default () => {
  const nano = require('nano')(config.dbUrl);
  const db = Promise.promisifyAll(nano.db);

  const createDatabase = (name) => {
    return db.createAsync(name)
      .catch((error) => {
        if (error.statusCode === 412) {
          console.log('Database already exists!');
        } else {
          throw error;
        }
      })
      .then(() => {
        return nano.use(name);
      });
  };

  return Promise.all([
    createDatabase('events'),
    createDatabase('users')
  ]).spread((eventsDB, usersDB) => {
    return {
      eventsDB: eventsDB,
      usersDB: usersDB
    };
  });
};
