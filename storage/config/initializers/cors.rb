Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'gateway'

    resource '/api/v1/*',
      headers: :any,
      methods: [:get, :post, :put, :delete]
  end
end
