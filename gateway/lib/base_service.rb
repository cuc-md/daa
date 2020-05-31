class BaseService
  attr_reader :params, :base_url, :resources, :headers, :status

  def initialize(base_url, resources, params)
    @params, @base_url, @resources = params, base_url, resources
    @headers = { "Content-Type" => "application/json" }
  end

  def create
    json do
      RestClient.post("#{base_url}/api/v1/#{resources}", params.to_json, headers)
    end
  end

  def index
    json do
      RestClient.get("#{base_url}/api/v1/#{resources}", headers.merge(params: params))
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
      RestClient.patch("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}", params.to_json, headers)
    end
  end

  protected

  def json(&block)
    result = block.call
    @status = result.code
    JSON.parse(result).deep_symbolize_keys
  rescue RestClient::ExceptionWithResponse => e
    @status = e.response.code
    JSON.parse(e.response.body)
  end
end
