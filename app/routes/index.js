const setupRoutes = (app, controllers) => {
  app.post('/events', controllers.events.post);
  app.get('/events', controllers.events.get);
};

export default setupRoutes;
