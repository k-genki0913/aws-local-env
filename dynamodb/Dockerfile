FROM amazon/aws-cli:2.3.2

ENV AWS_ACCESS_KEY_ID=dummy\
    AWS_SECRET_ACCESS_KEY=dummy\
    DYNAMODB_REGION=ap-northeast-1

ENV DEBIAN_FRONTEND=noninteractive
RUN yum update -y && yum install -y \
    tzdata\
    sudo \
    procps \
    which \
    gzip \
    jq

WORKDIR /opt/dynamo/src

COPY ./src .