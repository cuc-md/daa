# DAA project

## Installation & usage

To run in a container, please install `docker` and `docker-compose`.

Run `docker-compose up` to build and run the entire system, then open `localhost:8080` in your browser.

## Setup

To setup API Gateway, run

```bash
docker-compose run gateway bash

# inside the shell
rails db:create db:migrate db:seed
```
