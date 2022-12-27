## Description

A simple application under Docker environment.
* NestJS
* TypeORM
* PostgreSQL
* Swagger
* PGadmin4
* JWT
* Docker

## Tech stack
- NestJS
- TypeORM
- PostgreSQL
- Swagger
- JWT
- Docker

## Version
- Nodejs v16.14.0
- Yarn 1.22.18

# Running the app on docker
## Docker build & start

```bash
# docker env build
$ docker-compose build

# docker env start
$ docker-compose up

# remove docker container (services & networks)
$ docker-compose down
```

## Issue

```
If you get the error ERROR: relation "user_info" does not exist when posting the API, you need to run migration first
```

```
If you get this error:

The data directory was initialized by PostgreSQL version 14, which is not compatible with this version 15.1

- Remove folder pgdata in this project
- Remove volumes: docker volume rm <id>
- Remove docker images of this project and build again
```

## Migration

```bash
# generate migration
$ docker-compose run nestjs npm run typeorm:generate AnyNameYouLike

# run migration
$ docker-compose run nestjs npm run typeorm:run
```

# Running the app without docker
## Installation

```bash
$ npm install
```
## Migration

```bash
# generate migration
$ npm run typeorm:generate AnyNameYouLike

# run migration
$ npm run typeorm:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API doc

```
localhost:<port>/api
```
