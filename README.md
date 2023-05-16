# Arwi

## Installation and setup

- Clone this repository

  ```bash
  git clone https://github.com/ekkusi/arwi.git
  ```

- Install packages and generate prisma client (runs automatically in the postinstall script)

  ```bash
  yarn install
  ```

On first setup, you also need to setup:

### Setup database

- Set DATABASE_URL env variable to next/.env that points a live database. If there is no .env file here yet, create one.

If you want to use docker-compose to host the dev database, set the env variable to:

```
DATABASE_URL=postgresql://user:password@localhost:5432/arwi
```

- Run local Postgres database:

  ```bash
  docker-compose up
  ```

- Start app and frontend development servers
  
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