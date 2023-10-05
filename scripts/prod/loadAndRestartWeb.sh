#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

git pull
docker pull ekkusi/arwi-web
docker stop arwi-web || true && docker rm arwi-web || true
docker run -d --name arwi-web -p 5000:3000 ekkusi/arwi-web
docker rmi $(docker images -f "dangling=true" -q --no-trunc)
echo "New container running and old ones removed successfully!"