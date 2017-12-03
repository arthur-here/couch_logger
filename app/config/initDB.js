import Promise from 'bluebird';
import config from '../config/config';
import Nano from 'nano';

export default () => {
  const nano = Nano(config.dbUrl);
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

  return createDatabase('events')
    .then((eventsDB) => {
      return {
        eventsDB: eventsDB
      };
    });
};
