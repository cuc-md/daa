class ResultsService < BaseService
  def initialize(params)
    super(Settings.results_url, :results, params)
  end

  def details
    json do
      RestClient.get("#{Settings.results_url}/api/v1/results/#{params.delete(:id)}/details")
    end
  end
end
