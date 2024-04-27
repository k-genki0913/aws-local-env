# SQS

## Overview

ローカル環境で SQS を利用するためのコンテナ

### Folder Structure

```
sqs
| custom.conf
| docker-compose.yml
| README.md
```

### custom.conf

aws の認証情報や外部へ公開する情報(ポートなど)を設定できる。
また、Docker 起動時にキューを自動で設定することも可能。

### Start Docker Container

```
$ cd sqs
$ docker compose up -d
$ docker ps
```

docker ps の結果で以下の項目の状態が一致しているか確認(他項目は起動時によって変わる)

```
IMAGE                                 STATUS              PORTS                              NAMES
softwaremill/elasticmq-native:1.4.0   Up       0.0.0.0:9324-9325->9324-9325/tcp               sqs
```

### ElasticMQ Admin

作成したキューや保存されているメッセージ数を確認できる。
(キューの操作などはできない)

```
http://localhost:9325/
```

### 起動確認

※ aws-cli を用いる

【aws-cli のインストール・認証情報の設定を行う】

1. [Aws Cli](https://awscli.amazonaws.com/AWSCLIV2.msi)をインストールする

2. コマンドプロンプトやターミナルで下記コマンドを実行し、インストールできているか確認する。
   バージョンが表示されればインストール完了。

```
aws --version
```

3. 下記コマンドを実行し aws 認証情報を作成する

```
aws configure --profile elasticMq

AWS Access Key ID [None]: dummy
AWS Secret Access Key [None]: dummy
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

【SQS(ElastiMq)コンテナの起動確認】

1. 下記コマンドを実行し SQS(ElasticMq)コンテナにキューを作成する
   ※通常のキューを作成する場合は下記コマンドを実行

```
aws sqs create-queue --queue-name setupCheckNormalQueue --profile elasticMq --endpoint-url=http://localhost:9324
```

※FIFO キューを作成する場合は下記コマンドを実行

```
aws sqs create-queue --queue-name setupCheck.fifo --attributes FifoQueue=true --profile elasticMq --endpoint-url=http://localhost:9324
```

2. 下記コマンドを実行しキューの情報を取得できるか確認する

```
aws sqs list-queues --profile elasticMq --endpoint-url=http://localhost:9324
```

実行結果(例)

```
{
    "QueueUrls": [
        "http://localhost:9324/000000000000/setupCheckNormalQueue",
        "http://localhost:9324/000000000000/setupCheck.fifo"
    ]
}
```

3. 下記コマンドを実行し作成したキューを削除する
   ※1.で通常のキューを作成した場合

```
aws sqs delete-queue --profile elasticMq --endpoint-url=http://localhost:9324 --queue-url=http://localhost:9324/000000000000/setupCheckNormalQueue
```

※1.で FIFO キューを作成した場合

```
aws sqs delete-queue --profile elasticMq --endpoint-url=http://localhost:9324 --queue-url=http://localhost:9324/000000000000/setupCheck.fifo
```

下記コマンドを実行してキューが削除されていることを確認する

```
aws sqs list-queues --profile elasticMq --endpoint-url=http://localhost:9324
```
