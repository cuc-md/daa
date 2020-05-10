class PhotoPolicy < ApplicationPolicy
  def create?
    user.has_role?(User::MANAGE_EVENTS)
  end

  def destroy?
    create?
  end
end
