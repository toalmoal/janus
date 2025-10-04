import { Server } from "model/server.model";

export const environment = {
  production: true,
  server: <Server> {
    protocol: 'http',
    host: 'localhost:8080'
  }
};
