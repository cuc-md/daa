FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y sqlite3 libsqlite3-dev
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install && bundle exec rails db:create db:migrate
ADD . /app

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
