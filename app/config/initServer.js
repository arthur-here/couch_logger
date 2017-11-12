import restify from 'restify';

const initServer = () => {
  const server = restify.createServer();

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.requestLogger());

  return server;
};

export default initServer;
