class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Whitelist

  devise :database_authenticatable, :registerable, :recoverable, :validatable,
    :jwt_authenticatable, jwt_revocation_strategy: self

  ROLES = %w(manage_events manage_all_events)
  ROLES.each do |role|
    const_set(role.upcase, role)
  end

  validate :roles_validation

  def add_role(new_role)
    return unless ROLES.include?(new_role)
    self.roles += [new_role]
  end

  def add_roles(roles)
    roles.each { |role| add_role(role) }
  end

  def remove_role(role)
    return unless ROLES.include?(role)
    self.roles -= [role]
  end

  def remove_roles(roles)
    roles.each { |role| remove_role(role) }
  end

  def roles_validation
    unknown_roles = roles - ROLES
    errors.add(:roles, "Unknown roles: #{unknown_roles.join(', ')}") if unknown_roles.size > 0
  end
end
