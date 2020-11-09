let jsonServer = require('json-server');
let server = jsonServer.create();
let router = jsonServer.router(require('./db/db.js')());
let middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3004, () => {
  console.log('JSON SERVER is running');
});
