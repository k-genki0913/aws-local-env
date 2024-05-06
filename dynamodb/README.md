# DynamoDB

## Overview

ローカル環境で DynamoDB を利用するためのコンテナ

### Folder Structure

```
dynamodb
|-aws-cli
|  |-src
|     |-.aws
|     |   |-config
|     |   |-credentials
|     |-shell
|     |-table-create.sh
|     |-table-definition
|          |-users.json
|
|-data
|-src
|  |-sample-v2.js
|  |-package.json
|  |-package-lock.json
|
|-docker-compose.yml
|-Dockerfile
|-README.md
```

### 実装ファイル

以下のファイルに`aws-sdk for JavaScript v2`を用いて SQS の操作を行う基本的な関数を定義しております。

試したい動作がある場合は`main`関数ないのコメントアウトを削除し実行してください。

`dynamodb/src/sample-v2.js`

### Start Docker Container

```
$ cd dynamodb
# docker compose up -d
$ docker ps
```

docker ps の結果で以下の項目の状態が一致しているか確認(他項目は起動時によって変わる)

```
IMAGE                           STATUS              PORTS                              NAMES
aaronshaf/dynamodb-admin:4.3.0    Up       0.0.0.0:8001->8001/tcp       dynamodb-admin
dynamodb-awscli                   Up                                        awscli
amazon/dynamodb-local:2.4.0       Up       0.0.0.0:8000->8000/tcp          dynamodb
```

### amazon/dynamodb-local

DynamoDB の機能をもつ Docker イメージ

### aaronshaf/dynamodb-admin

dynamodb-local を GUI で操作・確認するための機能を提供する Docker イメージ
下記 URL をブラウザで入力すると、DynamoDB Docker(dynamodb-local)に定義されている
テーブルやレコードを確認することができる。

### awscli

Dockerfile のイメージを元に作成するコンテナ。
Dockerfile で作成したイメージは aws-cli が既にインストール済みの
Linux イメージのため、aws-cli を用いて DynamoDB を利用するときに
本コンテナを利用する。

### 起動確認

※起動のみの場合は下記を実行するのみで良い

1. 下記 URL をブラウザに入力し起動するか確認

```
http://localhost:8001
```

### aws-cli コンテナを用いたテーブル作成

1. Start Docker Container の操作を行う。

2. 下記コマンドを実行し、aws-cli コンテナ内へ入る

```
docker exec -it awscli bash
```

3. aws-cli コンテナ内で下記コマンドを実行する

```
./shell/table-create.sh -T USERS
```

4. 下記 URL へアクセスし、USERS テーブルが作成されているか確認する

```
http://localhost:8001
```

### aws-cli を用いたデータ登録

1. Start Docker Container の操作を行う。

2. 下記コマンドを実行し、aws-cli コンテナ内へ入る

```
docker exec -it awscli bash
```

3. 【aws-cli コンテナを用いたテーブル作成】でユーザーテーブルを作成する

4. aws-cli コンテナ内で下記コマンドを実行する

```
./shell/record-put.sh -T USERS
```

5. 下記 URL へアクセスし、USERS テーブルに新しいレコードが登録されているか確認する

```
http://localhost:8001
```

### aws-cli を用いたテーブル削除

1. Start Docker Container の操作を行う。

2. 下記コマンドを実行し、aws-cli コンテナ内へ入る

```
docker exec -it awscli bash
```

3. 【aws-cli コンテナを用いたテーブル作成】でユーザーテーブルを作成する

4. aws-cli コンテナ内で下記コマンドを実行する

```
./shell/delete-table.sh -T USERS
```

5. 下記 URL へアクセスし、USERS テーブルが削除されているか確認する

```
http://localhost:8001
```
