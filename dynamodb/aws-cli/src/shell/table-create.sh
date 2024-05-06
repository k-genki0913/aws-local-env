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

aws dynamodb create-table \
  --region ap-northeast-1 \
  --endpoint-url http://dynamodb:8000 \
  --cli-input-json file://table-definition/${table_name}.json

exit 0
