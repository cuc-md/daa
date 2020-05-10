class StorageService < BaseService
  def initialize(params)
    super(Settings.storage_url, :question_packs, params)
  end

  def random
    json do
      RestClient.get("#{Settings.storage_url}/api/v1/question_packs/random")
    end
  end

  def document
    RestClient.get("#{Settings.storage_url}/api/v1/question_packs/#{params.delete(:id)}/document")
  rescue RestClient::ExceptionWithResponse => e
    JSON.parse(e.response.body)
  end
end
