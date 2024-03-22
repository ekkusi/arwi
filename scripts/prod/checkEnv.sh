#!/bin/bash

# Check if an argument was provided
if [ -z "$1" ]; then
    echo "Error: No JSON file path provided."
    echo "Usage: $0 /path/to/your/env-config.json"
    exit 1
fi

# Path to the JSON config file from the first script argument
CONFIG_JSON_PATH="$1"

echo "Checking environment variables against $CONFIG_JSON_PATH"
# Check if file exists
if [ ! -f "$CONFIG_JSON_PATH" ]; then
    echo "Error: File $CONFIG_JSON_PATH does not exist."
    exit 1
fi

# Is production environment, get if $ENVIRONMENT is production, and default to true
environment=${ENVIRONMENT:-production}

# Initialize arrays to hold the names of unset and optional variables
unset_vars=()
optional_vars=()

# Read obligatory environment variables from JSON file
obligatory_vars=$(jq -r '.obligatory[]' "$CONFIG_JSON_PATH")

# Read optional environment variables from JSON file
optional_vars=$(jq -r '.optional[]' "$CONFIG_JSON_PATH")

# Assuming you want to check obligatory_prod vars in production environment
obligatory_prod_vars=$(jq -r '.obligatory_prod[]' "$CONFIG_JSON_PATH")
if [ "$environment" == "production" ]; then
    obligatory_vars="$obligatory_vars $obligatory_prod_vars"
else
    optional_vars="$optional_vars $obligatory_prod_vars"
fi


# Check each obligatory environment variable
for var in $obligatory_vars; do
    if [ -z "${!var}" ]; then
        unset_vars+=("$var")
    fi
done

# Warn for each optional environment variable
for var in $optional_vars; do
    if [ -z "${!var}" ]; then
        echo "Warning: Optional environment variable $var is not set."
    fi
done

# Check if there are any unset obligatory variables
if [ ${#unset_vars[@]} -ne 0 ]; then
    echo "Error: The following obligatory environment variables are missing:"
    printf ' - %s\n' "${unset_vars[@]}"
    exit 1
else
    echo "All obligatory environment variables are set."
fi
