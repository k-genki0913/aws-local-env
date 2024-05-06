const aws = require('aws-sdk');

// Dockerのローカル環境へ接続するための情報
// endpointは必ず指定しなければ送り先がDockerコンテナにならない
const CONFIG = {
  region: 'ap-northeast-1',
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  dynamodb: {
    endpoint: 'http://localhost:8000',
  },
};

// aws-sdkの設定を更新
aws.config.update(CONFIG);

// DynamoDBを操作するインスタンスを生成
const dynamodb = new aws.DynamoDB();

const create = async () => {
  console.log('DynamoDB.createTable() - START');
  // テーブル情報を設定
  const tableParam = {
    TableName: 'USERS',
    KeySchema: [
      // KeyType HASHはプライマリーキー
      {
        KeyType: 'HASH',
        AttributeName: 'user_id',
      },
      {
        // KeyType RANGEはソートキー
        KeyType: 'RANGE',
        AttributeName: 'country_code',
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
  };
  // テーブルを作成
  await dynamodb.createTable(tableParam).promise();

  console.log('DynamoDB.createTable() - END');
};

const deleteT = async () => {
  console.log('DynamoDB.deleteTable() - START');

  // テーブル削除情報
  const param = {
    TableName: 'USERS',
  };
  // テーブルを削除
  const result = await dynamodb.deleteTable(param).promise();
  console.log(`deleteTable result: ${JSON.stringify(result)}`);

  console.log('DynamoDB.deleteTable() - END');
};

const insertRecord = async () => {
  console.log('DynamoDB.putItem() - START');

  // 登録情報を設定
  const recordInfo = {
    user_id: { S: 'test-Genki' },
    country_code: { S: 'jp' },
    age: { S: '28' },
  };
  // DynamoDBに登録するために必要な情報を追加
  // 上記で設定した登録情報はItemに設定する
  const recordParam = {
    TableName: 'USERS',
    Item: recordInfo,
    ConditionExpression: 'attribute_not_exists(user_id)',
  };
  // 情報の登録
  await dynamodb.putItem(recordParam).promise();

  console.log('DynamoDB.putItem() - END');
};

const getRecord = async () => {
  console.log('DynamoDB.getItem() - START');

  // テーブルから取得するために必要な情報を設定
  const param = {
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
  };
  // データの取得
  const result = await dynamodb.getItem(param).promise();

  // 取得したデータを表示
  console.log(`putItem result: ${JSON.stringify(result)}`);
  console.log('DynamoDB.getItem() - END');
};

const updateRecord = async () => {
  console.log('DynamoDB.updateItem() - START');

  // 更新するために必要な情報の設定
  const param = {
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
    UpdateExpression: 'set age = :x',
    ExpressionAttributeValues: {
      ':x': { S: '29' },
    },
    ReturnValues: 'ALL_NEW',
  };
  // 更新処理
  const result = await dynamodb.updateItem(param).promise();
  // 更新後の情報を表示
  console.log(`updateItem result: ${JSON.stringify(result)}`);

  console.log('DynamoDB.updateItem() - END');
};

const deleteRecord = async () => {
  console.log('DynamoDB.deleteItem() - START');

  // テーブルに登録されている情報を削除するために必要な情報を設定
  const param = {
    TableName: 'USERS',
    Key: {
      user_id: { S: 'test-Genki' },
      country_code: { S: 'jp' },
    },
    ReturnValues: 'ALL_OLD',
  };
  // 削除処理
  const result = await dynamodb.deleteItem(param).promise();
  // 削除したデータを表示
  console.log(`deleteItem result: ${JSON.stringify(result)}`);

  console.log('DynamoDB.deleteItem() - END');
};

const scanTable = async () => {
  console.log('DynamoDB.scan() - END');
  // スキャンするために必要な情報を設定
  const param = {
    TableName: 'USERS',
  };
  // スキャン処理
  const result = await dynamodb.scan(param).promise();
  // スキャンで取得したデータを表示
  console.log(JSON.stringify(result));
  console.log('DynamoDB.scan() - END');
};

const queryTable = async () => {
  console.log('DynamoDB.query() - START');
  // クエリの対象と検索条件を設定
  const param = {
    TableName: 'USERS',
    KeyConditionExpression: 'user_id = :x',
    ExpressionAttributeValues: {
      ':x': {
        S: 'test-Genki',
      },
    },
  };
  // クエリ処理
  const result = await dynamodb.query(param).promise();
  // クエリで取得した情報を表示
  console.log(JSON.stringify(result));
  console.log('DynamoDB.query() - END');
};

// 各関数を実行するために利用する関数
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
