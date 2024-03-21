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

profile="test-apk"
platform="android"

while getopts ":p:e" opt; do
  case $opt in
    d)
      echo "-p was triggered, changing platform to: $OPTARG" >&2
      profile=$OPTARG
      ;;
    f)
      echo "-e was triggered, changing profile to '$OPTARG'">&2
      platform=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# Echo the profile and platform
echo "Running eas build --platform $platform --profile $profile --local"

eas build --platform $platform --profile $profile --local
