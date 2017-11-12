import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';

const initServer = () => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(morganLogger('dev'));

  return server;
};

export default initServer;
