class AuthFailureApp < Devise::FailureApp
  def http_auth_body
    return super unless request_format == :json
    {
      error: { message: "Unauthorized" }
    }.to_json
  end
end
