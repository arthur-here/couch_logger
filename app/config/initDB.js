import Promise from 'bluebird';
import config from '../config/config';
import Nano from 'nano';

export default () => {
  const nano = Nano(config.dbUrl);
  const db = Promise.promisifyAll(nano.db);

  const createLevels = (eventsDB) => {
    let levels = [
      { _id: 'debug', name: 'Debug', type: 'level' },
      { _id: 'info', name: 'Info', type: 'level' },
      { _id: 'error', name: 'Error', type: 'level' },
      { _id: 'warning', name: 'Info', type: 'level' }
    ];

    const insertLevel = (level) => {
      return Promise.promisify(eventsDB.insert)(level)
        .catch((error) => {
          if (error.statusCode === 409) {
            console.log(`${level.name} Level already exists`);
          } else {
            throw error;
          }
        });
    };

    return Promise.map(levels, insertLevel);
  };

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
      return createLevels(eventsDB)
        .then(() => {
          return eventsDB;
        });
    })
    .then((eventsDB) => {
      return {
        eventsDB: eventsDB
      };
    });
};
