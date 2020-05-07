import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import endpoints from './endpoints';

class Server {
  constructor() {
    this.configureServer();
    this.start();
  }

  configureServer() {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cors());

    for (const key in endpoints) {
      const endpoint = endpoints[key];

      if (endpoint.middleware) { app[endpoint.method](endpoint.url, endpoint.middleware, endpoint.handler); } else { app[endpoint.method](endpoint.url, endpoint.handler); }
    }

    this._app = app;
  }

  start() {
    if (!process.env.PORT) {
      process.env.PORT = 3000;
      console.log(`No port was specified, defaulting to ${process.env.PORT}`);
    }

    this._app.listen(process.env.PORT, () => {
      console.log(`API is started, listening on port ${process.env.PORT}`);
    });
  }
}

const serverSingleton = new Server();
export default serverSingleton;
