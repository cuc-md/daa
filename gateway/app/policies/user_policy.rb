class UserPolicy < ApplicationPolicy
  attr_reader :user, :resource

  def initialize(user, resource)
    @user, @resource = user, resource
  end

  def index?
    user.has_role?(User::MANAGE_USERS)
  end

  def show?
    user.has_role?(User::MANAGE_USERS)
  end

  def update?
    user.has_role?(User::MANAGE_USERS)
  end

  def destroy?
    user.has_role?(User::MANAGE_USERS)
  end
end

