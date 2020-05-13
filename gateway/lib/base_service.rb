class BaseService
  attr_reader :params, :base_url, :resources, :headers

  def initialize(base_url, resources, params)
    @params, @base_url, @resources = params, base_url, resources
    @headers = { "Content-Type" => "application/json" }
  end

  def create
    json do
      RestClient.post("#{base_url}/api/v1/#{resources}", params, headers)
    end
  end

  def index
    json do
      RestClient.get("#{base_url}/api/v1/#{resources}", headers)
    end
  end

  def show
    json do
      RestClient.get("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}", headers)
    end
  end

  def destroy
    json do
      RestClient.delete("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}", headers)
    end
  end

  def update
    json do
      RestClient.patch("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}", params, headers)
    end
  end

  protected

  def json(&block)
    JSON.parse(block.call).deep_symbolize_keys
  rescue RestClient::ExceptionWithResponse => e
    JSON.parse(e.response.body)
  end
end
