import config from 'config/config';
import restify from 'restify';
import routes from 'routes';

import helloController from 'controllers/helloController';

const server = restify.createServer();

const controllers = {
  hello: helloController
};

routes(server, controllers);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
