#!/bin/bash

# Ensure we will be in root
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd "../../"
source .env.staging-web

containerName=arwi-web-staging
imageName=ekkusi/arwi-web
tagName=$1
if [ -z "$tagName" ]; then
    echo "Please provide the tag name of the Docker backend image as argument"
    exit 1
fi

# Pull the latest changes from the repository
git fetch --all
git switch $tagName
git pull

# Pull the new image
docker pull $imageName:$tagName

# Get the Image ID of the currently running container (if it exists)
oldImageId=$(docker inspect $containerName --format='{{.Image}}' 2>/dev/null)

# Stop and remove the old container (if it exists)
docker stop $containerName || true
docker rm $containerName || true

# Run the new container with the new image
docker run --env-file .env.staging-web -d --name $containerName -p 5001:3000 --restart=unless-stopped $imageName:$tagName

# Remove the old image, if it's not the same as the new one and if it exists
if [ ! -z "$oldImageId" ] && [ "$oldImageId" != "$(docker images $imageName:$tagName -q)" ]; then
  docker rmi $oldImageId || true
fi

echo "New container running and old ones removed successfully!"
