# ![screenshot](media/logo.png) Janus - Minimilistic NodeJS + Express + TypeORM

Endpoints are implemented for the following features:
1. <a href="http://localhost:8080/api/status" target="_blank">Application health</a>
2. JWT based <a href="http://localhost:8080/api/auth" target="_blank">authentication/authorization<a>
3. <a href="http://localhost:8080/api/user" target="_blank">List All users</a> (requires requesting user to have ```Admin``` role. Authentication Bearer token is expected in the request http header)

## Running locally

### Create local database

```sql
CREATE DATABASE `janus`;
CREATE USER 'janus'@'localhost' IDENTIFIED BY 'Qb!:@v)+4PG>Frq';
GRANT ALL ON janus.* TO 'janus'@'localhost';
```

### Build and start server

```console
$ npm i
$ npm run clean
$ npm run typeorm:dev:update
$ npm run build
$ npm run start
```

## Running via Docker

```console
$ npm i
$ npm run clean
$ npm run build
$ npm run docker:create
$ npm run docker:start
$ npm run docker:ash # This will launch the ash console on the running docker container
```

### On the docker container ASH terminal

```console
$ npm run typeorm:prod:update
```
