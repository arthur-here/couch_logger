import config from './config/config';
import initDB from './config/initDB';
import initServer from './config/initServer';
import repositories from './repository';
import controllers from './controllers';
import setupRoutes from './routes';

initDB()
  .then((dbs) => {
    return repositories(dbs);
  })
  .then((repositories) => {
    return controllers(repositories);
  })
  .then((controllers) => {
    let server = initServer(__dirname);
    setupRoutes(server, controllers);
    return server;
  })
  .then((server) => {
    server.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
  });
