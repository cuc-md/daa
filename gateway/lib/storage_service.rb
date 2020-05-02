class StorageService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def create
    json do
      RestClient.post("#{Settings.storage_url}/api/v1/question_packs", params)
    end
  end

  def index
    json do
      RestClient.get("#{Settings.storage_url}/api/v1/question_packs")
    end
  end

  def show
    json do
      RestClient.get("#{Settings.storage_url}/api/v1/question_packs/#{params.delete(:id)}")
    end
  end

  def destroy
    json do
      RestClient.delete("#{Settings.storage_url}/api/v1/question_packs/#{params.delete(:id)}")
    end
  end

  def update
    json do
      RestClient.patch("#{Settings.storage_url}/api/v1/question_packs/#{params.delete(:id)}", params)
    end
  end

  def random
    json do
      RestClient.get("#{Settings.storage_url}/api/v1/question_packs/random")
    end
  end

  def document
    RestClient.get("#{Settings.storage_url}/api/v1/question_packs/#{params.delete(:id)}/document")
  end

  private

  def json(&block)
    JSON.parse(block.call).deep_symbolize_keys
  rescue RestClient::ExceptionWithResponse => e
    JSON.parse(e.response.body)
  end
end
