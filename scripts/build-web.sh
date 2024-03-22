#!/bin/bash
# SCRIPT TO TEST BUILDING THE WEB IMAGE, BASICALLY JUST TO READ SECRETS FROM .secrets FILE

callPath=$(pwd)
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"
cd ".."

# Check if .secrets file exists and exit if not
if [ ! -f .secrets ]; then
    echo "No .secrets file found!"
    exit 1
fi

# Temporary directory for secrets
tmp_secret_dir=$(mktemp -d)
echo "Temporary directory for secrets: $tmp_secret_dir"

# Initialize the build command
build_command="docker build"

# Read each line from the secrets file
while IFS= read -r line; do
    id=$(echo "$line" | cut -d'=' -f1)
    value=$(echo "$line" | cut -d'=' -f2)

    # Create a temporary file for the secret
    secret_file="$tmp_secret_dir/$id"
    echo "$value" > "$secret_file"

    # Append the secret to the Docker build command
    build_command+=" --secret id=$id,src=$secret_file"
done < .secrets

# Add the context to the build command
build_command+=" -f Dockerfile.web -t ekkusi/arwi-web-test ."

# Execute the Docker build command
# Copy command to clipboard
echo "Command: $build_command"
# echo "$build_command" | pbcopy
# echo "Command copied to clipboard!"
eval "$build_command"

# Clean up the temporary secrets directory
echo "Removing temporary secrets directory: $tmp_secret_dir"
# echo "Secrets dir: $tmp_secret_dir"
rm -r "$tmp_secret_dir"
