processId=$(lsof -t -i:3333)

echo $processId

if [ -z  "$processId" ]
then
  echo "No process running in port 3333, skipping killing"
else
  echo "Process running in port 3333, killing"
  kill -9 $processId
fi