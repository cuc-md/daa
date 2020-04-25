class EventPolicy < ApplicationPolicy
  attr_reader :user, :event

  def initialize(user, event)
    @user, @event = user, event
  end

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
