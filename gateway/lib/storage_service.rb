class StorageService < BaseService
  def initialize(params)
    super(Settings.storage_url, :question_packs, params)
  end

  def index
    json do
      if params[:difficulty]
        RestClient.get("#{base_url}/api/v1/#{resources}?difficulty=#{params[:difficulty]}", headers)
      else
        RestClient.get("#{base_url}/api/v1/#{resources}", headers)
      end
    end
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
