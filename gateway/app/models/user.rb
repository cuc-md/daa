class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Whitelist

  devise :database_authenticatable, :registerable, :recoverable, :validatable, :confirmable,
    :jwt_authenticatable, jwt_revocation_strategy: self
end
