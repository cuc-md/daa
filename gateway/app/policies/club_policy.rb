class ClubPolicy < ApplicationPolicy
  def create?
    user.has_role?(User::MANAGE_CLUBS)
  end

  def update?
    user.has_role?(User::MANAGE_CLUBS)
  end

  def destroy?
    user.has_role?(User::MANAGE_CLUBS)
  end
end
