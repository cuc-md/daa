class AuthFailureApp < Devise::FailureApp
  def http_auth_body
    {
      error: { message: "Unauthorized" }
    }.to_json
  end

  def respond
    http_auth
  end
end
