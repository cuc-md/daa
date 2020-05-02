Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['http://gateway:8000', "http://localhost:3000"]

    resource '/api/v1/**/*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete]
  end
end
