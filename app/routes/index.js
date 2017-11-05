export default function (app, controllers) {
  app.post('/hello', controllers.hello.post);
  app.get('/hello', controllers.hello.get);
  app.post('/items', controllers.items.post);
  app.get('/items', controllers.items.get);
};
