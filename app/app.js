import restify from 'restify';

import config from './config/config.js';
import routes from './routes';

import helloController from './controllers/helloController';
import itemsController from './controllers/itemsController';

const server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.requestLogger());

const controllers = {
  hello: helloController,
  items: itemsController
};

routes(server, controllers);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
