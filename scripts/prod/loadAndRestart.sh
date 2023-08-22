#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

git pull
/bin/bash scripts/dumpdb.sh -b
docker pull ekkusi/arwi-backend
docker stop arwi-backend || true && docker rm arwi-backend || true
docker run --env-file .env.production -d --name arwi-backend -p 3000:4000 ekkusi/arwi-backend
docker rmi $(docker images -f "dangling=true" -q --no-trunc)
echo "New container running and old ones removed successfully!"