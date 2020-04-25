class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    render_user(current_user)
  end

  def index
    authorize :user, :index?
    users = User.pluck(:id, :name, :email, :roles).map do |id, name, email, roles|
      {
        id:    id,
        name:  name,
        email: email
      }
    end

    render json: {
      data: { users: users }
    }
  end

  def show
    authorize :user, :show?

    user = User.find(params[:id])

    render_user(user)
  end

  def update
    authorize :user, :update?

    user = User.find(params[:id])
    user.assign_attributes(permitted_params)
    user.save!

    render_user(user)
  end

  def destroy
    authorize :user, :destroy?

    user = User.find(params[:id])
    user.destroy!

    render_user(user)
  end

  private

  def permitted_params
    params.require(:user).permit(:name, :email)
  end

  def render_user(user)
    render json: {
      data: {
        user: {
          id:    user.id,
          name:  user.name,
          email: user.email,
          roles: user.roles
        }
      }
    }
  end
end
