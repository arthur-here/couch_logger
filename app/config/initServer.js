import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';

const initServer = (appDirName) => {
  const server = express();

  server.set('views', path.join(appDirName, 'views'));
  server.set('view engine', 'ejs');
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(morganLogger('dev'));

  return server;
};

export default initServer;
