const aws = require('aws-sdk');
const fs = require('fs');

const s3 = new aws.S3({
  region: 'ap-northeast-1',
  accessKeyId: 'dummy_access_key',
  secretAccessKey: 'dummy_secret_access_key',
  endpoint: 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const list = async () => {
  console.log('S3 listBuckets() - START');

  // 上記で生成したS3インスタンスから取得できるS3 バケットを取得する
  const result = await s3.listBuckets().promise();
  // 取得したS3 Bucketを表示
  console.log(result);

  console.log('S3 listBuckets() - END');
};

const create = async () => {
  console.log('S3 createBucket() - START');

  // 作成するS3 バケット名を指定
  const params = {
    Bucket: 'test-bucket',
  };
  // S3 バケット作成処理
  const result = await s3.createBucket(params).promise();
  // 作成したバケットの情報を表示
  console.log(`createBucket result: ${JSON.stringify(result)}`);

  console.log('S3 createBucket() - END');
};

const deleteB = async () => {
  console.log('S3 deleteBucket() - START');

  // 削除するS3 Bucket名を指定
  const param = {
    Bucket: 'test-bucket',
  };
  // S3 Bucket削除処理を実行
  const result = await s3.deleteBucket(param).promise();
  console.log(`deleteBucket result: ${JSON.stringify(result)}`);

  console.log('S3 deleteBucket() - END');
};

const putItem = async () => {
  console.log('S3 putObject() - START');

  // S3へアップロードする画像ファイルをsampleフォルダから取得する
  const sampleFile = fs.readFileSync('./image/sample-image.jpeg');
  const param = {
    // 保存先のS3 バケット名を指定する
    Bucket: 'test-bucket',
    // S3へ保存される時の名前(Key)を指定する
    Key: 'test-sample-image',
    // S3へアップロードする画像ファイルを指定する
    Body: sampleFile,
  };
  // アップロード(保存)処理を実行
  const result = await s3.putObject(param).promise();
  // アップロード実行結果を表示
  console.log(`putObject Result: ${JSON.stringify(result)}`);

  console.log('S3 putObject() - END');
};

const getItem = async () => {
  console.log('S3 getObject() - START');

  // データを取得するS3 Bucket、ファイル名を指定する
  const param = {
    // 取得するS3 Bucket名
    Bucket: 'test-bucket',
    // 取得するデータのファイル名
    Key: 'test-sample-image',
  };
  // S3からデータを取得
  const result = await s3.getObject(param).promise();

  // S3から取得したデータをimageフォルダ内に保存
  fs.writeFileSync('./image/downloaded-sample-image.jpeg', result.Body);

  console.log('S3 getObject() - END');
};

const listItems = async () => {
  console.log('S3 listObject() - START');
  // オブジェクト一覧を取得するBucket名を指定
  const param = {
    Bucket: 'test-bucket',
  };
  // オブジェクト一覧取得
  const result = await s3.listObjects(param).promise();
  // 取得したオブジェクト一覧を表示
  console.log(`listObjects Result: ${JSON.stringify(result)}`);

  console.log('S3 listObject() - END');
};

const main = async () => {
  // await create();
  // await list();
  // await deleteB();
  // await putItem();
  // await getItem();
  // await listItems();
};

main();
