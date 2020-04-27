module ApiHelpers
  def parsed_response
    if response.body.present?
      JSON.parse(response.body).deep_symbolize_keys
    else
      nil
    end
  end
end
