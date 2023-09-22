lastPath=$1

if [ -z "$lastPath" ]; then
    echo "Please provide last migration name as argument"
    exit 1
fi

callPath=$(pwd)
scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$scriptPath/.."

cd "prisma/migrations"

for d in */
do
    migrationName="${d%/}"
    cd "../.."
    echo "Resolving $migrationName"
    npx prisma migrate resolve --applied $migrationName
    cd "prisma/migrations"
    if [ $migrationName = $lastPath ]; then
        echo "Last migration occurred"
        break
    fi
done

echo "Resolve done!"  