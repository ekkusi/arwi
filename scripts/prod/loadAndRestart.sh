#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

docker pull ekkusi/arwi
docker run --env-file .env.production -d --name arwi -p 3000:3000 ekkusi/arwi