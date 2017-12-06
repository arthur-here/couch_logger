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

  const createViews = (db) => {
    const documentID = '_design/logger';
    const views = {
      '_id': documentID,
      'views': {
        'all-users': {
          'map': 'function (doc) {\n  if (doc.type === "user") {\n    emit(doc._id, doc); \n  }\n}'
        },
        'all-events': {
          'map': 'function (doc) {\n  if (doc.type === "event") {\n    emit(doc._id, doc); \n  }\n}'
        },
        'events-by-user': {
          'map': 'function (doc) {\n  if (doc.type == "event") {\n    emit(doc.userID, doc);\n  }\n}'
        }
      },
      'language': 'javascript'
    };

    const getDesignDocument = Promise.promisify(db.get);
    const insertDesignDocument = Promise.promisify(db.insert);
    return getDesignDocument(documentID)
      .catch((error) => {
        console.log(error);
        return insertDesignDocument(views);
      })
      .then(() => { return db; });
  };

  return createDatabase('events')
    .then(createViews)
    .then((eventsDB) => {
      return {
        eventsDB: eventsDB
      };
    });
};
