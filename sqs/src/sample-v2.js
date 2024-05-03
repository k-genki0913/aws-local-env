const aws = require('aws-sdk');
const crypto = require('crypto');

const config = {
  region: 'ap-northeast-1',
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
};

aws.config.update(config);

const endpointUrl = 'http://localhost:9324';
const sqs = new aws.SQS({
  apiVersion: '2021-02-05',
  endpoint: endpointUrl,
});

// SQSからキューの情報を取得する
const list = async () => {
  console.log('SQS.listQueues() - START');
  // listQueuesの1つ目の引数は未指定でも良い。new aws.SQSでどのendpointから情報を取得するか指定しているため
  await sqs
    .listQueues({}, (err, data) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('Success', data);
      }
    })
    .promise();
  console.log('SQS.listQueues() - END');
};

// SQSへキューを作成する
const create = async () => {
  console.log('SQS.createQueue() - START');
  // 作成条件 fifoを作成するときは、QueueNameを.fifoにし、AttributesにFifoQueue: trueを指定する
  // 必要に応じて追加情報を設定する(aws-sdk v2のAPIを確認する)
  const createParam = {
    QueueName: 'newQueue.fifo',
    Attributes: {
      FifoQueue: 'true',
    },
  };

  let queueUrl;

  // createQueueの1つ目の引数に上記で作成した作成条件を指定する
  await sqs
    .createQueue(createParam, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        // 作成したQueueのURLはdataの中に格納されている
        queueUrl = data.QueueUrl;
        console.log('Success', data);
      }
    })
    .promise();

  console.log('SQS.createQueue() - END');
};

// キューを削除する
const deleteQ = async () => {
  console.log('SQS.deleteQueue() - START');

  // 削除するキューのURLを指定する。必要に応じて追加情報を設定する(aws-sdk v2のAPIを確認する)
  const deleteParam = {
    QueueUrl: 'http://localhost:9324/000000000000/defaultNormalQueue',
  };

  // deleteQueueの1つ目の引数に上記で作成した削除条件を指定する
  await sqs
    .deleteQueue(deleteParam, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    })
    .promise();
  console.log('SQS.deleteQueue() - END');
};

// キューへメッセージ(データ)を送信する
const send = async () => {
  console.log('SQS.sendMessage() - START');
  // キューに送るメッセージ(データ)とどのキューに送るかを指定
  // fifoキューの場合はMessageDeduplicationIdとMessageGroupIdを設定する必要がある
  // 必要に応じて追加情報を設定する(aws-sdk v2のAPIを確認する)
  const param = {
    MessageBody: 'testSendMessage',
    MessageDeduplicationId: 'testDeduplication',
    MessageGroupId: crypto.randomUUID(),
    QueueUrl: 'http://localhost:9324/000000000000/newQueue.fifo',
  };

  // sendMessageの第一引数に上記で設定した情報を設定する
  sqs
    .sendMessage(param, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    })
    .promise();
  console.log('SQS.sendMessage() - END');
};

// SQSからメッセージを受信する
const receive_delete = async () => {
  console.log('SQS.receiveMessage() - START');
  // どのキューからメッセージ
  const param = {
    QueueUrl: 'http://localhost:9324/000000000000/newQueue.fifo',
  };

  await sqs
    .receiveMessage(param, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else if (data) {
        console.log('Success', data);
        if (data.Messages) {
          const messageBody = data.Messages[0].Body;
          const receiptHandle = data.Messages[0].ReceiptHandle;
          console.log(messageBody);
          console.log(receiptHandle);
          const deleteParam = {
            QueueUrl: 'http://localhost:9324/000000000000/newQueue.fifo',
            ReceiptHandle: receiptHandle,
          };
          sqs.deleteMessage(deleteParam, (err, data) => {
            if (err) {
              console.log('Error', err);
            } else {
              console.log('Success', data);
            }
          });
        }
      }
    })
    .promise();
  console.log('SQS.receiveMessage() - END');
};

const main = async () => {
  //await list();
  // await create();
  // await send();
  // await receive_delete();
  // await deleteQ();
  // await list();
};

main();
