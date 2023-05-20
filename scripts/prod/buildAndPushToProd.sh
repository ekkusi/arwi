#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"

docker build --platform linux/amd64 -t ekkusi/arwi:latest .
docker push ekkusi/arwi:latest

ssh eke@199.247.31.107 "cd arwi && git pull && bash scripts/prod/loadAndRestart.sh"