callPath=$(pwd)
parentPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parentPath"

set -a
source "../.env"
set +a

# If SENTRY_AUTH_TOKEN is not set, stop the script
if [ -z "$SENTRY_AUTH_TOKEN" ]; then
  echo "SENTRY_AUTH_TOKEN is not set, aborting. Set it in .env file"
  exit 1
fi

# Echo the profile and platform
echo "Running npx expo run:ios"

npx expo run:ios