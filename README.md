# Arwi

## Installation and setup

- Clone this repository

  ```bash
  git clone https://github.com/ekkusi/zen-tracking.git
  ```

- Install packages, generate prisma client and build backend

  ```bash
  yarn install
  ```

On first setup, you also need to setup:

### Setup database

- Set DATABASE_URL env variable to next/.env that points a live database. If there is no .env file here yet, create one.

If you want to use docker-compose to host the dev database, set the env variable to:

```
DATABASE_URL=postgresql://user:password@localhost:5432/zen-tracking
```

- Run local Postgres database by running:

  ```bash
  docker-compose up
  ```


- Start docker to run local postgre database (needs to be up for backend to work)

  ```bash
  docker-compose up
  ```

- Start backend and frontend development servers
  
Windows:

  ```bash
  yarn start-win
  ```

Mac/Linux:

  ```bash
  yarn start-mac
  ```

## Other

### Generate types from graphql

App (frontend)

```bash
  yarn codegen:app
```

Next (back)

```bash
  yarn codegen:next
```

NOTE: Both of these require that the graphql server (next) is running to work