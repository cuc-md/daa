# API Gateway

## Install

Run the following commands to work without Docker container:

```bash
# install all gems
bundle install

# add create DB user
sudo -u postgres psql
CREATE USER gateway_user WITH ENCRYPTED PASSWORD '123456';
ALTER USER gateway_user CREATEDB;
\q

# create DB and run migrations
bundle exec rails db:create db:migrate
```

## Troubleshooting

During development on startup there may appear `GemNotFound` error or similar when launching as Docker container. Rebuild the container:

```bash
docker-compose run gateway bundle
docker-compose build gateway
```

## Usage

Each endpoint returns the data in the following format:

```json
{
  "data": collection / object
}
```

If an error occurs, the data will follow the pattern:


```json
{
  "error": { details }
}
```
