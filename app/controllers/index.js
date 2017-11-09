import eventsController from './eventsController';
import usersController from './usersController';

const repositories = (repositories) => {
  return {
    events: eventsController(repositories.events),
    users: usersController(repositories.users)
  };
};

export default repositories;
