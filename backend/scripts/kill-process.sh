processId=$(lsof -t -i:4000)

echo $processId

if [ -z  "$processId" ]
then
  echo "No process running in port 4000, skipping killing"
else
  echo "Process running in port 4000, killing"
  kill -9 $processId
fi