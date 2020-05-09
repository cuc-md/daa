class BaseService
  attr_reader :params, :base_url, :resources

  def initialize(base_url, resources, params)
    @params, @base_url, @resources = params, base_url, resources
  end

  def create
    json do
      RestClient.post("#{base_url}/api/v1/#{resources}", params)
    end
  end

  def index
    json do
      RestClient.get("#{base_url}/api/v1/#{resources}")
    end
  end

  def show
    json do
      RestClient.get("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}")
    end
  end

  def destroy
    json do
      RestClient.delete("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}")
    end
  end

  def update
    json do
      RestClient.patch("#{base_url}/api/v1/#{resources}/#{params.delete(:id)}", params)
    end
  end

  protected

  def json(&block)
    JSON.parse(block.call).deep_symbolize_keys
  rescue RestClient::ExceptionWithResponse => e
    JSON.parse(e.response.body)
  end
end
