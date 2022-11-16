const http = require('http');
const app = require('./backend/app')
const { env } = require('process');
//used to make sure when we set up ports it is valid
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;

}
//Pass errors and handle gracefully.
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe" + port : "Port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
//Used for logging incoming req
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  //debug(" Listening on " + bind);
}
const port = normalizePort(process.env.PORT || 3001);
app.set('port', port)
const server = http.createServer(app);
server.on("error", onError);
//server.on("listening", onListening);
server.listen(port);
