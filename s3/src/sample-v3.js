const {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3');
const fs = require('fs');

// Dockerコンテナ(S3)を操作するために必要な設定を引数に指定し
// S3インスタンスを生成
const client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: 'dummy_access_key',
    secretAccessKey: 'dummy_secret_access_key',
  },
  endpoint: 'http://localhost:9000',
  forcePathStyle: true,
});

const list = async () => {
  console.log('S3 ListBucketsCommand() - START');

  // S3からバケット一覧を取得するためのコマンドを生成
  const command = new ListBucketsCommand({});
  // バケット一覧取得コマンドを送り、取得したデータのから表示させたいプロパティを取得する
  const { Owner, Buckets } = await client.send(command);
  // S3 Bucketのオーナー情報を表示
  console.log(Owner);
  // S3 Bucket一覧情報を表示
  console.log(Buckets);

  console.log('S3 ListBucketsCommand() - END');
};

const create = async () => {
  console.log('S3 CreateBucketsCommand() - START');

  // S3 Bucketを作成するためのコマンドを生成
  // Bucket名を設定
  const command = new CreateBucketCommand({
    Bucket: 'test-bucket',
  });
  // バケット作成コマンドを送り、実行結果の中から表示させたいプロパティを取得
  const { Location } = await client.send(command);
  // 作成したバケットのパスを表示
  console.log(Location);

  console.log('S3 CreateBucketsCommand() - END');
};

const deleteB = async () => {
  console.log('S3 DeleteBucketsCommand() - START');

  // S3 Bucketを削除するためのコマンドを生成
  // 削除対象のBucket名を設定
  const command = new DeleteBucketCommand({
    Bucket: 'test-bucket',
  });
  // バケット削除コマンドを送り、実行結果を取得
  const result = await client.send(command);
  // 実行結果を表示
  console.log(result);

  console.log('S3 DeleteBucketsCommand() - END');
};

const putItem = async () => {
  console.log('S3 PutObjectCommand() - START');

  // S3べアップロードする画像ファイルをsampleフォルダから取得する
  const sampleFile = fs.createReadStream('./image/sample-image.jpeg');
  // S3へアップロードするためのコマンドを生成
  const command = new PutObjectCommand({
    // 保存先のS3 バケット名を指定する
    Bucket: 'test-bucket',
    // S3へ保存される時の名前(Key)を指定する
    Key: 'test-sample-image',
    // S3へアップロードする画像ファイルを指定する
    Body: sampleFile,
  });
  // アップロード(保存)コマンドを送り、実行結果を取得
  const result = await client.send(command);
  // アップロード実行結果を表示
  console.log(result);

  console.log('S3 PutObjectCommand() - END');
};

const getItem = async () => {
  console.log('S3 GetObjectCommand() - START');

  // S3からダウンロードするためのコマンドを指定する
  const command = new GetObjectCommand({
    // 取得するS3 Bucket名
    Bucket: 'test-bucket',
    // 取得するデータのファイル名
    Key: 'test-sample-image',
  });
  // ダウンロードコマンドを送り、結果を取得
  const result = await client.send(command);
  // 取得したデータをimageフォルダ内に保存
  // v3では取得したデータのbodyがReadableStreamオブジェクトのため
  // streamを用いてデータを保存する必要がある
  result.Body.pipe(
    fs.createWriteStream('./image/downloaded-sample-image.jpeg')
  );

  console.log('S3 GetObjectCommand() - END');
};

const listItems = async () => {
  console.log('S3 ListObejectsV2Command() - START');

  // Bucketからオブジェクト一覧を取得するコマンドを生成
  const command = new ListObjectsV2Command({
    Bucket: 'test-bucket',
  });
  // Bucket内に保存されているオブジェクト一覧を取得するコマンドを実行
  // オブジェクトの情報が格納されているContentsを取得
  const { Contents } = await client.send(command);
  // 実行結果を表示
  console.log(Contents);

  console.log('S3 ListObejectsV2Command() - END');
};

const main = async () => {
  // await list();
  // await create();
  // await deleteB();
  // await putItem();
  // await getItem();
  // await listItems();
};

main();
