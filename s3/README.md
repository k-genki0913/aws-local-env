# S3

## Overview

ローカル環境で S3 を利用するためのコンテナ

### Folder Structure

```
s3
|-data
|-src
|  |-image
|  |  |-sample-image.jpeg
|  |-package.json
|  |-package-lock.json
|  |-sample-v2.js
|  |-sample-v3.js
| .gitignore
| docker-compose.yml
| README.md
```

### 実装ファイル

以下のファイルに`aws-sdk for JavaScript v2`を用いて S3 の操作を行う基本的な関数を定義しております。

試したい動作がある場合は`main`関数内のコメントアウトを削除し実行してください。

`s3/src/sample-v2.js`

以下のファイルに`aws-sdk for JavaScript v3`を用いて DynamoDB の操作を行う基本的な関数を定義しております。

試したい動作がある場合は`main`関数内のコメントアウトを削除し実行してください。

`s3/src/sample-v3.js`

### Docker 起動時のバケット作成

`docker`起動時に`default-bucket`という名前のバケットが自動で作成されるように設定している。
起動時にバケットの自動作成の設定は`docker-compose.yml`の
`mc`コンテナの`entrypoint`で設定しているコマンドで実行しております。

### Start Docker Container

```
$ cd s3
$ docker compose up -d
$ docker ps
```

docker ps の結果で以下の項目の状態が一致しているか確認(他項目は起動時によって変わる)

```
            IMAGE                         STATUS                     PORTS                              NAMES
minio/minio:RELEASE.2023-01-18T04-36-38Z    Up       0.0.0.0:9000->9000/tcp, 0.0.0.0:9090->9090/tcp       s3
```

### minio Admin

作成したバケットや保存されているデータを確認できる

```
http://localhost:9090
```
