#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

git pull
/bin/bash scripts/dumpdb.sh -b
npm run prisma:deploy-prod
docker pull ekkusi/arwi
docker stop arwi || true && docker rm arwi || true
docker run --env-file .env.production -d --name arwi -p 3000:3000 ekkusi/arwi
docker rmi $(docker images -f "dangling=true" -q --no-trunc)
echo "New container running and old ones removed successfully!"