class TeamPolicy < ApplicationPolicy
  def update?
    user.has_role?(User::MANAGE_EVENTS)
  end

  def destroy?
    user.has_role?(User::MANAGE_EVENTS)
  end
end
