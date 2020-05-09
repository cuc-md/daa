FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y mongodb-dev
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
ADD . /app

CMD ["rails", "server", "-b", "0.0.0.0"]
