# S3

## Overview

ローカル環境で S3 を利用するためのコンテナ

### Folder Structure

```
s3
| docker-compose.yml
| README.md
```

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
