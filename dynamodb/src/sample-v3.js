const {
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  QueryCommand,
} = require('@aws-sdk/client-dynamodb');

// Dockerのローカル環境へ接続するための情報を設定しDynamoDBClientインスタンスを生成
// endpointは必ずDocker環境へ送るためのURLを設定する必要がある
const client = new DynamoDBClient({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
  endpoint: 'http://localhost:8000',
});

const create = async () => {
  console.log('DynamoDB.send(CreateTableCommand) - START');

  // テーブル情報を設定する
  const command = new CreateTableCommand({
    TableName: 'USERS',
    KeySchema: [
      {
        AttributeName: 'user_id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'country_code',
        KeyType: 'RANGE',
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'user_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'country_code',
        AttributeType: 'S',
      },
    ],
    BillingMode: 'PROVISIONED',
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  });
  // テーブルを作成
  const response = await client.send(command);
  // 作成したテーブル情報を表示
  console.log(response);
  console.log('DynamoDB.send(CreateTableCommand) - END');
};

const deleteT = async () => {
  console.log('DynamoDB.send(DeleteTableCommand) - START');
  // テーブル削除情報
  const command = new DeleteTableCommand({
    TableName: 'USERS',
  });
  // テーブルを削除
  const response = await client.send(command);
  // 削除したテーブルの情報を表示
  console.log(response);

  console.log('DynamoDB.send(DeleteTableCommand) - END');
};

const insertRecord = async () => {
  console.log('DynamoDB.send(PutItemCommand) - START');
  // 登録情報を設定
  const command = new PutItemCommand({
    TableName: 'USERS',
    Item: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
      age: { S: '28' },
    },
    ConditionExpression: 'attribute_not_exists(user_id)',
  });

  // 情報の登録
  const response = await client.send(command);
  // 登録した情報の表示
  console.log(response);

  console.log('DynamoDB.send(PutItemCommand) - END');
};

const getRecord = async () => {
  console.log('DynamoDB.send(GetItemCommand) - START');
  // テーブルから取得するために必要な情報を設定
  const command = new GetItemCommand({
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
  });
  // データの取得
  const response = await client.send(command);
  // 取得した情報の表示
  console.log(response);

  console.log('DynamoDB.send(GetItemCommand) - END');
};

const updateRecord = async () => {
  console.log('DynamoDB.send(UpdateItemCommand) - START');
  // 更新するために必要な情報の設定
  const command = new UpdateItemCommand({
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
    UpdateExpression: 'set age = :x',
    ExpressionAttributeValues: {
      ':x': { S: '29' },
    },
    // 戻り値が更新後の情報になるように設定
    ReturnValues: 'ALL_NEW',
  });
  // 更新処理
  const response = await client.send(command);
  // 更新後の情報を表示
  console.log(response);

  console.log('DynamoDB.send(UpdateItemCommand) - END');
};

const deleteRecord = async () => {
  console.log('DynamoDB.send(DeleteItemCommand) - START');
  // テーブルに登録されている情報を削除するために必要な情報を設定
  const command = new DeleteItemCommand({
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
    // 戻り値が更新後の情報になるように設定
    ReturnValues: 'ALL_OLD',
  });
  // 削除処理
  const response = await client.send(command);
  // 削除したデータを表示
  console.log(response);

  console.log('DynamoDB.send(DeleteItemCommand) - END');
};

const scanTable = async () => {
  console.log('DynamoDB.send(ScanCommand) - START');
  // スキャンするために必要な情報を設置
  const command = new ScanCommand({
    TableName: 'USERS',
  });
  // スキャン処理
  const response = await client.send(command);
  // スキャンで取得したデータを表示
  console.log(response);
  console.log('DynamoDB.send(ScanCommand) - END');
};

const queryTable = async () => {
  console.log('DynamoDB.send(QueryCommand) - START');
  // クエリの対象と検索条件を設置
  const command = new QueryCommand({
    TableName: 'USERS',
    KeyConditionExpression: 'user_id = :x',
    ExpressionAttributeValues: {
      ':x': {
        S: 'test-Genki',
      },
    },
  });
  // クエリ処理
  const response = await client.send(command);
  // クエリで取得した情報を表示
  console.log(response);

  console.log('DynamoDB.send(QueryCommand) - END');
};

const main = async () => {
  // await create();
  // await deleteT();
  // await insertRecord();
  // await getRecord();
  // await updateRecord();
  // await deleteRecord();
  // await scanTable();
  // await queryTable();
};

main();
