#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

docker build --platform linux/amd64 -t ekkusi/arwi-backend:latest -f Dockerfile.backend .
docker push ekkusi/arwi-backend:latest