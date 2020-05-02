# Questions storage

## Install

Run the following commands to work without Docker container:

```bash
# install all gems
bundle install

# create DB and run migrations
bundle exec rails db:create db:migrate db:seed
```

## Troubleshooting

During development on startup there may appear `GemNotFound` error or similar when launching as Docker container. Rebuild the container:

```bash
docker-compose run storage bundle
docker-compose build storage
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

