class EventPolicy < ApplicationPolicy
  def create?
    user.has_role?(User::MANAGE_EVENTS)
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
