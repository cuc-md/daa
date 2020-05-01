class UserPolicy < ApplicationPolicy
  def index?
    can_manage_users?
  end

  def show?
    can_manage_users?
  end

  def update?
    can_manage_users?
  end

  def destroy?
    can_manage_users?
  end

  def list_roles?
    can_manage_users?
  end

  def grant_roles?
    can_manage_users? && user.id != record.id
  end

  def revoke_roles?
    can_manage_users?
  end

  private

  def can_manage_users?
    user.has_role?(User::MANAGE_USERS)
  end
end

