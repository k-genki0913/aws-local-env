#!/usr/bin/bash

while getopts "T:" tableName
do
  case "${tableName}" in
    T) table_name=${OPTARG};;
  esac
done

if [ -z "${table_name}" ]; then
    echo "tableName is Empty"
    exit 1
fi

aws dynamodb put-item \
  --region ap-northeast-1\
  --endpoint-url http://dynamodb:8000 \
  --table-name ${table_name} \
  --item file://records/${table_name}.json

exit 0