import express from 'express';

const setupRoutes = (app, controllers) => {
  const router = express.Router();

  router.post('/events', controllers.events.post);
  router.get('/events', controllers.events.get);
  router.post('/users', controllers.users.post);
  router.get('/users', controllers.users.get);
  router.get('/users/:userID', controllers.users.getByID);

  app.use('/', router);
};

export default setupRoutes;
