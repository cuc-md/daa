class QuestionPackPolicy < ApplicationPolicy
  def create?
    user.has_role?(User::MANAGE_EVENTS)
  end

  def update?
    user.has_role?(User::MANAGE_EVENTS)
  end

  def destroy?
    user.has_role?(User::MANAGE_EVENTS)
  end
end
