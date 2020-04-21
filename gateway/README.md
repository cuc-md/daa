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
