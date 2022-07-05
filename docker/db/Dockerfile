FROM postgres:13

RUN apt-get update
RUN apt-get install postgresql-13-wal2json

RUN mkdir -p /docker-entrypoint-initdb.d
