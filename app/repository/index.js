import Promise from 'bluebird';

import eventsRepository from './eventsRepository';
import usersRepository from './usersRepository';

const repositories = (dbs) => {
  return {
    events: eventsRepository(dbs.eventsDB),
    users: usersRepository(dbs.usersDB)
  };
};

export default repositories;
