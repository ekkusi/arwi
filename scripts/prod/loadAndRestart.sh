#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"
source .env.production

git pull
/bin/bash scripts/dumpdb.sh -b
docker compose -f docker-compose.prod.yml --env-file ./.env.production pull
docker compose -f docker-compose.prod.yml --env-file ./.env.production up -d

cd backend && DATABASE_URL=$DATABASE_URL npx --yes prisma migrate deploy && cd ..
echo "New container running and old ones removed successfully!"
