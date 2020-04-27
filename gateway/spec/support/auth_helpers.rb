require 'devise/jwt/test_helpers'

module AuthHelpers
  def auth_headers(*args, **opts)
    Devise::JWT::TestHelpers.auth_headers(*args, **opts)
  end
end
