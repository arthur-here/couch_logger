import eventsRepository from './eventsRepository';
import usersRepository from './usersRepository';

const repositories = (dbs) => {
  return {
    events: eventsRepository(dbs.eventsDB),
    users: usersRepository(dbs.eventsDB)
  };
};

export default repositories;
