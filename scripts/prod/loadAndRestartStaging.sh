#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"
source .env.staging

tagName=$1
if [ -z "$tagName" ]; then
    echo "Please provide the tag name of the Docker backend image as argument"
    exit 1
fi

git pull
docker pull ekkusi/arwi-backend:$tagName
docker stop arwi-backend-staging || true && docker rm arwi-backend-staging || true
docker run --env-file .env.staging -e APP_ENV=staging -d --name arwi-backend-staging -p 4100:4000 ekkusi/arwi-backend:$tagName
docker rmi $(docker images -f "dangling=true" -f "reference=arwi-backend-staging" -q --no-trunc)

cd backend && DATABASE_URL=$DATABASE_URL npx --yes prisma migrate deploy && cd ..

echo "New container running and old ones removed successfully!"
