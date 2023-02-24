processId=$(lsof -t -i:3000)

echo $processId

if [ -z  "$processId" ]
then
  echo "No process running in port 3000, skipping killing"
else
  echo "Process running in port 3000, killing"
  kill -9 $processId
fi