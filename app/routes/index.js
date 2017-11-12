const setupRoutes = (app, controllers) => {
  app.post('/events', controllers.events.post);
  app.get('/events', controllers.events.get);
  app.post('/users', controllers.users.post);
  app.get('/users', controllers.users.get);
  app.get('/users/:userID', controllers.users.getByID);
};

export default setupRoutes;
