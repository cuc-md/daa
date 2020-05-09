class PhotoService < BaseService
  def initialize(params)
    super(Settings.storage_url, :photos, params)
  end

  def show
    RestClient.get("#{Settings.storage_url}/api/v1/photos/#{params.delete(:id)}")
  rescue RestClient::ExceptionWithResponse => e
    JSON.parse(e.response.body)
  end
end
