export default function (app, controllers) {
  app.post('/hello', controllers.hello.post);
  app.get('/hello', controllers.hello.get);
};
