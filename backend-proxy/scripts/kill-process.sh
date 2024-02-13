processId=$(lsof -t -i:4001)

echo $processId

if [ -z  "$processId" ]
then
  echo "No process running in port 4001, skipping killing"
else
  echo "Process running in port 4001, killing"
  kill -9 $processId
fi