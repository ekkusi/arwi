#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

set -o allexport -o errexit
source .env.production
./scripts/prod/checkEnv.sh ./env-config.json
./scripts/prod/checkEnv.sh ./backend/env-config.json
./scripts/prod/checkEnv.sh ./backend-proxy/env-config.json
set +o allexport +o errexit


exit 1

git pull
/bin/bash scripts/dumpdb.sh -b
docker compose -f docker-compose.prod.yml --env-file ./.env.production pull
docker compose -f docker-compose.prod.yml --env-file ./.env.production up -d

cd backend && DATABASE_URL=$DATABASE_URL npx --yes prisma migrate deploy && cd ..
echo "New container running and old ones removed successfully!"
