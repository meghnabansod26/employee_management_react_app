const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Your database file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

module.exports = (req, res) => server(req, res);
