/*
  Event Model:
  {
    "name": "Death",
    "time": 123123,
    "logLevel": "debug",
    "userID": "hello-world@gmail.com",
    "type": "event"
  }
*/

import logLevels from '../config/logLevels';

const eventViewModel = (event) => {
  const formatTime = (time) => {
    return new Date(time).toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
  };

  const logLevelToColor = (logLevel) => {
    return logLevels[logLevel].color;
  };

  return {
    time: formatTime(event.time),
    user: event.userID,
    name: event.name,
    logLevel: event.logLevel,
    color: logLevelToColor(event.logLevel),
    eventLink: `events/${event._id}`
  };
};

export default eventViewModel;
